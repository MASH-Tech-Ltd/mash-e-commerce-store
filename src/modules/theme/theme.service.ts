import { Theme } from './theme.model';
import { ITheme } from './theme.model';

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
  return result;
};

export const ThemeService = {
  updateTheme,
  getTheme,
};
