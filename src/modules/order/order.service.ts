import { Order } from './order.model';
import { IOrder } from './order.interface';
import { Customer } from '../customer/customer.model';
import { Product } from '../product/product.model';
import { paginationHelper } from '../../helpers/paginationHelper';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);

  try {
    const existingCustomer = await Customer.findOne({ 
      phone: payload.customerPhone, 
    });

    if (existingCustomer) {
      await Customer.findByIdAndUpdate(existingCustomer._id, {
        $inc: { totalOrders: 1, totalSpent: payload.totalPrice },
        $set: { name: payload.customerName }
      });
    } else {
      await Customer.create({
        name: payload.customerName,
        phone: payload.customerPhone,
        totalOrders: 1,
        totalSpent: payload.totalPrice
      });
    }
  } catch (error) {
    console.error('Error tracking customer details:', error);
  }

  return result;
};


const getPaginatedOrders = async (query: any) => {
  const { page, limit, skip } = paginationHelper(query.page, query.limit);
  
  const filter: any = {};
  
  if (query.status && query.status !== 'all') {
    filter.status = query.status;
  }
  
  if (query.search) {
    filter.$or = [
      { customerName: { $regex: query.search, $options: 'i' } },
      { customerPhone: { $regex: query.search, $options: 'i' } },
    ];
  }

  const [data, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter)
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }
  };
};

const updateOrder = async (id: string, payload: Partial<IOrder>): Promise<IOrder | null> => {
  const order = await Order.findOne({ _id: id });
  if (!order) return null;

  const oldStatus = order.status;
  const newStatus = payload.status || oldStatus;
  
  const isOldCompleted = ['confirmed', 'shipped', 'delivered'].includes(oldStatus);
  const isNewCompleted = ['confirmed', 'shipped', 'delivered'].includes(newStatus);
  
  // Check if items are being modified
  const itemsChanged = !!payload.items;

  // 1. Revert old stock if the order was completed AND (it is now cancelled/pending OR the items are changing)
  if (isOldCompleted && (!isNewCompleted || itemsChanged)) {
    try {
      for (const item of order.items) {
        if (item.variantName) {
          // Variant product: revert the specific variant's stock
          await Product.updateOne(
            { _id: item.productId, 'variants.variantName': item.variantName },
            { $inc: { 'variants.$.stock': item.quantity, salesCount: -item.quantity } }
          );
        } else {
          // Single product: revert top-level stock
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { salesCount: -item.quantity, stock: item.quantity }
          });
        }
      }
    } catch (e) {
      console.error("Error reverting product counts:", e);
    }
  }

  // Perform the update
  const result = await Order.findOneAndUpdate({ _id: id }, payload, { new: true });

  // 2. Apply new stock if the order is now completed AND (it was previously not completed OR the items changed)
  if (result && isNewCompleted && (!isOldCompleted || itemsChanged)) {
    try {
      for (const item of result.items) {
        if (item.variantName) {
          // Variant product: decrement the specific variant's stock
          await Product.updateOne(
            { _id: item.productId, 'variants.variantName': item.variantName },
            { $inc: { 'variants.$.stock': -item.quantity, salesCount: item.quantity } }
          );
        } else {
          // Single product: decrement top-level stock
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { salesCount: item.quantity, stock: -item.quantity }
          });
        }
      }
    } catch (e) {
      console.error("Error updating product counts:", e);
    }
  }

  return result;
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
