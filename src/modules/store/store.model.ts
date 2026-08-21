import { Schema, model, Document } from 'mongoose';

export interface IStore extends Document {
  name: string;
  logo: string;
  customDomain?: string;
  settings: {
    checkoutNote?: string;
    stripePublishableKey?: string;
    stripeSecretKey?: string;
    [key: string]: any;
  };
}

const storeSchema = new Schema<IStore>(
  {
    name: { type: String, default: 'My Store' },
    logo: { type: String, default: '' },
    customDomain: { type: String },
    settings: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true, strict: false }
);

export const Store = model<IStore>('Store', storeSchema);
