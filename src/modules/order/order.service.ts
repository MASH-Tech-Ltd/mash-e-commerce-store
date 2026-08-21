import { Order } from "./order.model";
import { IOrder } from "./order.interface";
import { Customer } from "../customer/customer.model";
import { Product } from "../product/product.model";
import { paginationHelper } from "../../helpers/paginationHelper";
import { User } from "../auth/auth.model";
import mongoose from "mongoose";
import { notificationService } from "../notification/notification.service";
import { FraudCheckService } from "../fraudCheck/fraudCheck.service";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Order.create([payload], { session });
    const order = result[0];
    if (!order) {
      throw new Error("Failed to create order");
    }

    // Fraud check will be run after transaction commits (moved below)

    const existingCustomer = await Customer.findOne({
      phone: payload.customerPhone,
    }).session(session);

    if (existingCustomer) {
      await Customer.findByIdAndUpdate(existingCustomer._id, {
        $inc: { totalOrders: 1, totalSpent: payload.totalPrice },
        $set: {
          name: payload.customerName,
          address: payload.shippingAddress,
          division: payload.division,
          district: payload.district,
          upazila: payload.upazila,
        },
        $push: {
          activity: {
            orderId: order._id,
            type: "order_created",
            status: payload.status || "pending",
            date: new Date(),
          },
        },
      }, { session });
    } else {
      await Customer.create([{
        name: payload.customerName,
        phone: payload.customerPhone,
        ...(payload.shippingAddress
          ? { address: payload.shippingAddress }
          : {}),
        ...(payload.division ? { division: payload.division } : {}),
        ...(payload.district ? { district: payload.district } : {}),
        ...(payload.upazila ? { upazila: payload.upazila } : {}),
        totalOrders: 1,
        totalSpent: payload.totalPrice,
        activity: [
          {
            orderId: order._id,
            type: "order_created",
            status: "pending",
            date: new Date(),
          },
        ],
      }], { session });
    }

    // Notify all admins about the new order
    const admins = await User.find({ role: 'admin' }).session(session);
    for (const admin of admins) {
      await notificationService.createNotification(
        admin._id.toString(),
        'ORDER_CREATED',
        'New Order Received',
        `Order #${order._id.toString().substring(0, 6).toUpperCase()} has been placed by ${payload.customerName}`,
        order._id.toString()
      );
    }

    await session.commitTransaction();
    session.endSession();

    // Run fraud check in the background AFTER transaction commits
    FraudCheckService.checkFraud(order._id.toString()).catch((err) => {
      console.error("Error running fraud check:", err);
    });

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error tracking customer details or sending notification:", error);
    throw error;
  }
};

const getPaginatedOrders = async (query: any) => {
  const { page, limit, skip } = paginationHelper(query.page, query.limit);

  const filter: any = {};

  if (query.status && query.status !== "all") {
    filter.status = query.status;
  }

  if (query.search) {
    filter.$or = [
      { customerName: { $regex: query.search, $options: "i" } },
      { customerPhone: { $regex: query.search, $options: "i" } },
    ];
  }

  const [data, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateOrder = async (
  id: string,
  payload: Partial<IOrder>,
): Promise<IOrder | null> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findOne({ _id: id }).session(session);
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return null;
    }

    const oldStatus = order.status;
    const newStatus = payload.status || oldStatus;

    const isOldCompleted = ["confirmed", "shipped", "delivered"].includes(
      oldStatus,
    );
    const isNewCompleted = ["confirmed", "shipped", "delivered"].includes(
      newStatus,
    );

    // Check if items are being modified
    const itemsChanged = !!payload.items;

    // 1. Revert old stock if the order was completed AND (it is now cancelled/pending OR the items are changing)
    if (isOldCompleted && (!isNewCompleted || itemsChanged)) {
      for (const item of order.items) {
        if (item.variantName) {
          await Product.updateOne(
            { _id: item.productId, "variants.variantName": item.variantName },
            {
              $inc: {
                "variants.$.stock": item.quantity,
                salesCount: -item.quantity,
              },
            },
            { session }
          );
        } else {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { salesCount: -item.quantity, stock: item.quantity },
          }, { session });
        }
      }
    }

    // Perform the update
    const result = await Order.findOneAndUpdate({ _id: id }, payload, {
      new: true,
      session,
    });

    // 2. Apply new stock if the order is now completed AND (it was previously not completed OR the items changed)
    if (result && isNewCompleted && (!isOldCompleted || itemsChanged)) {
      for (const item of result.items) {
        if (item.variantName) {
          await Product.updateOne(
            { _id: item.productId, "variants.variantName": item.variantName },
            {
              $inc: {
                "variants.$.stock": -item.quantity,
                salesCount: item.quantity,
              },
            },
            { session }
          );
        } else {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { salesCount: item.quantity, stock: -item.quantity },
          }, { session });
        }
      }
    }

    // 3. Track customer activity on status change
    if (result && oldStatus !== newStatus) {
      let activityType = "status_change";
      if (newStatus === "cancelled") activityType = "cancel";
      if (newStatus === "delivered") activityType = "receive";

      await Customer.findOneAndUpdate(
        { phone: result.customerPhone },
        {
          $push: {
            activity: {
              orderId: result._id,
              type: activityType,
              status: newStatus,
              date: new Date(),
              note:
                payload.note ||
                `Status changed from ${oldStatus} to ${newStatus}`,
            },
          },
        },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating order in transaction:", error);
    throw error;
  }
};

const deleteOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findOneAndDelete({ _id: id });
  return result;
};

export const OrderService = {
  createOrder,
  getPaginatedOrders,
  updateOrder,
  deleteOrder,
};
