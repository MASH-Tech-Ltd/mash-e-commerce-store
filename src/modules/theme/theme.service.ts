import { Theme } from './theme.model';
import { ITheme } from './theme.model';
import { Store } from '../store/store.model';
import { User } from '../auth/auth.model';

const updateTheme = async (payload: Partial<ITheme>) => {
  const result = await Theme.findOneAndUpdate(
    {},
    { ...payload },
    { new: true, upsert: true }
  );
  return result;
};

const getTheme = async () => {
  let result = await Theme.findOne({});
  if (!result) {
    result = await Theme.create({});
  }

  const store = await Store.findOne({});
  const admin = await User.findOne({ role: 'admin' });

  const themeObj = result.toObject() as any;

  themeObj.storeInfo = {
    name: store?.name || 'My Store',
    logo: store?.logo || '',
    settings: store?.settings || {}
  };

  if (admin) {
    themeObj.footer = themeObj.footer || {};
    themeObj.footer.contactInfo = {
      email: admin.email || themeObj.footer.contactInfo?.email,
      phone: admin.phone || themeObj.footer.contactInfo?.phone,
      address: admin.address || themeObj.footer.contactInfo?.address,
    };

    if (admin.details) {
      try {
        const details = JSON.parse(admin.details);
        themeObj.footer.policies = themeObj.footer.policies || {};
        
        if (details.returnPolicy) {
          themeObj.footer.policies.returnPolicy = details.returnPolicy;
        }
      } catch(e) {}
    }
  }

  return themeObj;
};

export const ThemeService = {
  updateTheme,
  getTheme,
};
