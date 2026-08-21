import { Courier } from './courier.model';
import { ICourier } from './courier.interface';
import { encryptText, decryptText } from '../../utils/encryption';

const getCourierCharge = async () => {
  let courier = await Courier.findOne({});
  if (!courier) {
    // Auto-create default if not exists
    courier = await Courier.create({ insideDhaka: 60, outsideDhaka: 120 });
  }
  return courier;
};

const updateCourierCharge = async (payload: Partial<ICourier>) => {
  const result = await Courier.findOneAndUpdate(
    {},
    payload,
    { new: true, upsert: true }
  );
  return result;
};

const saveCredentials = async (payload: Partial<ICourier>) => {
  if (payload.apiSecret) {
    payload.apiSecret = encryptText(payload.apiSecret);
  }
  
  const result = await Courier.findOneAndUpdate(
    {},
    payload,
    { new: true, upsert: true }
  );
  return result;
};

const getAllCredentials = async () => {
  const couriers = await Courier.find();
  
  // Decrypt the secrets before returning for Admin
  return couriers.map((c) => {
    const doc = c.toObject();
    if (doc.apiSecret) {
      doc.apiSecret = decryptText(doc.apiSecret);
    }
    return doc;
  });
};

const sendOrderToCourier = async (order: any) => {
  const courierConfig = await Courier.findOne({});
  
  if (!courierConfig || !courierConfig.provider || !courierConfig.clientId) {
    throw new Error('Courier configuration is missing. Cannot dispatch order.');
  }

  const { provider, clientId, apiSecret } = courierConfig;
  const decryptedSecret = apiSecret ? decryptText(apiSecret) : '';

  // Simulate API fetch call to the respective provider
  console.log(`[COURIER DISPATCH] Sending order ${order._id} to ${provider.toUpperCase()}`);
  console.log(`[COURIER DISPATCH] Auth: ClientID=${clientId}, Secret=${decryptedSecret ? '***' : 'NONE'}`);
  console.log(`[COURIER DISPATCH] Payload:`, {
    invoice: order.orderId || order._id,
    recipient_name: order.customerName,
    recipient_phone: order.customerPhone,
    recipient_address: order.shippingAddress,
    cod_amount: order.totalPrice,
  });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated response
  const trackingId = `${provider.toUpperCase()}-${Math.floor(Math.random() * 1000000)}`;
  
  console.log(`[COURIER DISPATCH SUCCESS] Tracking ID: ${trackingId}`);

  return trackingId;
};

export const CourierService = {
  getCourierCharge,
  updateCourierCharge,
  saveCredentials,
  getAllCredentials,
  sendOrderToCourier,
};
