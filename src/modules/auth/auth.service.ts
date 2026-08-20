import { IUser } from './auth.interface';
import { User } from './auth.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

import mongoose from 'mongoose';
import slugify from 'slugify';

const register = async (payload: Partial<IUser>): Promise<Omit<IUser, 'password'>> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    payload.role = 'admin';

    const user = new User(payload);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const login = async (payload: Partial<IUser>): Promise<{ accessToken: string, user: any }> => {
  const { email, password } = payload;
  const user = await User.findOne({ email: email as string }).select('+password');
  
  if (!user || !user.password) {
    throw new Error('User not found or password not set');
  }

  const isPasswordMatch = await bcrypt.compare(password as string, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: config.jwt_expires_in as any,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return {
    accessToken,
    user: userObj,
  };
};

export const AuthService = {
  register,
  login,
};
