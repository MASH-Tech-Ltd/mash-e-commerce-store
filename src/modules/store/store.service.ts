import { Store } from './store.model';

const getStore = async () => {
  let store = await Store.findOne();
  if (!store) {
    store = await Store.create({ name: 'My Store' });
  }
  return store;
};

const updateStore = async (payload: any) => {
  let store = await Store.findOne();
  if (!store) {
    store = await Store.create({ name: 'My Store' });
  }
  
  // payload can contain dot notation keys like "settings.stripePublishableKey"
  // so we use findOneAndUpdate to handle these nicely
  const updatedStore = await Store.findOneAndUpdate(
    { _id: store._id },
    { $set: payload },
    { new: true, runValidators: true }
  );
  
  return updatedStore;
};

export const StoreService = {
  getStore,
  updateStore,
};
