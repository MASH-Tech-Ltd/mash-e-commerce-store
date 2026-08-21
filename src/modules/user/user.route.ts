import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from '../../middleware/authMiddleware';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { upload } from '../../middleware/multer.middleware';

const router = Router();

// Merchant updating their own profile
router.put(
  "/me",
  authMiddleware("admin"),
  upload.single("avatar"),
  UserController.updateProfile
);

// Only Super Admin can view all users, get specific user, update or delete other users
router.get("/", authMiddleware("admin"), UserController.getAllUsers);
router.get("/:id", authMiddleware("admin"), UserController.getUserById);
router.put("/:id", authMiddleware("admin"), validateRequest(UserValidation.updateUserSchema), UserController.updateUser);
router.delete("/:id", authMiddleware("admin"), UserController.deleteUser);

export const UserRoutes = router;
