import { Request, Response } from "express";
import { UserService } from "./user.service";
import ApiResponse from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { uploadCloudinary, deleteCloudinary } from "../../helpers/cloudinary";

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;

  if (req.file) {
    // Delete old avatar if it exists
    const existingUser = await UserService.getUserById(userId as string);
    if (existingUser && existingUser.avatar && existingUser.avatar.public_id) {
      try {
        await deleteCloudinary(existingUser.avatar.public_id);
      } catch (e) {
        console.error(`Failed to delete old avatar image: ${existingUser.avatar.public_id}`, e);
      }
    }

    const uploadResult = await uploadCloudinary(req.file.path);
    req.body.avatar = {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url
    };
  } else if (req.body.removeAvatar === 'true') {
    // User explicitly removed the avatar
    const existingUser = await UserService.getUserById(userId as string);
    if (existingUser && existingUser.avatar && existingUser.avatar.public_id) {
      try {
        await deleteCloudinary(existingUser.avatar.public_id);
      } catch (e) {
        console.error(`Failed to delete old avatar image: ${existingUser.avatar.public_id}`, e);
      }
    }
    // We set avatar to an empty object or null. Mongoose might handle null or {} differently.
    // If it's a nested object, setting to empty object or null is fine. We will set it to null.
    req.body.avatar = null;
  }

  const result = await UserService.updateProfile(userId, req.body);
  ApiResponse.sendSuccess(res, 200, "Profile updated successfully", result);
});

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers(req.query);
  ApiResponse.sendSuccess(res, 200, "Users retrieved successfully", result);
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.id as string);
  ApiResponse.sendSuccess(res, 200, "User retrieved successfully", result);
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id as string, req.body);
  ApiResponse.sendSuccess(res, 200, "User updated successfully", result);
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const existingUser = await UserService.getUserById(req.params.id as string);
  if (existingUser && existingUser.avatar && existingUser.avatar.public_id) {
    try {
      await deleteCloudinary(existingUser.avatar.public_id);
    } catch (e) {
      console.error(`Failed to delete user avatar on deletion: ${existingUser.avatar.public_id}`, e);
    }
  }

  const result = await UserService.deleteUser(req.params.id as string);
  ApiResponse.sendSuccess(res, 200, "User deleted successfully", result);
});

export const UserController = {
  updateProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
