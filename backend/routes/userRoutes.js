import express from "express";
import {validateRequest} from "../middlewares/validateRequest.js";
import {mapToUserDTO} from "../middlewares/mapToUserDTO.js";
import {userSchema} from "../models/validation/userValidation.js";
import {createUser, updateCurrentUser, updateUserRole} from "../controllers/userController.js";
import {loginUser} from "../controllers/authController.js";
import authorizeRoles from "../middlewares/auth/authorizeRoles.js";
import {authenticate} from "../middlewares/auth/auth.js";

const router = express.Router();

router.post("/register", validateRequest(userSchema), mapToUserDTO, createUser);

router.post('/auth/login', loginUser);

router.put(
    '/:userId',
    authenticate,
    authorizeRoles('ADMIN'),
    updateUserRole
);

router.patch('/me', authenticate, authorizeRoles('ADMIN', 'CUSTOMER'), updateCurrentUser);

export default router;
