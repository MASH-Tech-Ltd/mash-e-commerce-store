import { IUser } from './auth.interface';
import { User } from './auth.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

import mongoose from 'mongoose';
import slugify from 'slugify';

import CustomError from '../../helpers/CustomError';

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

const login = async (payload: Partial<IUser>): Promise<{ accessToken: string, refreshToken?: string, user: any }> => {
  const { email, password } = payload;
  const user = await User.findOne({ email: email as string }).select('+password');
  
  if (!user || !user.password) {
    throw new CustomError(401, 'Invalid email or password');
  }

  const isPasswordMatch = await bcrypt.compare(password as string, user.password);
  if (!isPasswordMatch) {
    throw new CustomError(401, 'Invalid email or password');
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: config.jwt_expires_in as any,
  });

  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {
    expiresIn: config.jwt_refresh_expires_in as any,
  });

  // Save refresh token to user
  await User.findByIdAndUpdate(user._id, { refreshToken });

  const userObj = user.toObject();
  delete userObj.password;

  return {
    accessToken,
    refreshToken,
    user: userObj,
  };
};

const refreshAccessToken = async (token: string) => {
  if (!token) {
    throw new Error('Refresh token is required');
  }

  // Verify the token signature
  let decoded: any;
  try {
    decoded = jwt.verify(token, config.jwt_refresh_secret);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }

  // Check if token matches the one in DB
  const user = await User.findById(decoded._id);
  if (!user || user.refreshToken !== token) {
    throw new Error('Refresh token is invalid or expired');
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: config.jwt_expires_in as any,
  });

  return {
    accessToken,
  };
};

const logout = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
};

export const AuthService = {
  register,
  login,
  refreshAccessToken,
  logout,
};
