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

export const CourierService = {
  getCourierCharge,
  updateCourierCharge,
  saveCredentials,
  getAllCredentials,
};
