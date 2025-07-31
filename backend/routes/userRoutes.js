import express from "express";
import {validateRequest} from "../middlewares/validateRequest.js";
import {mapToUserDTO} from "../middlewares/mapToUserDTO.js";
import {
    changePasswordSchema,
    updateUserByAdminSchema,
    updateUserSchema,
    userSchema
} from "../models/validation/userValidation.js";
import {
    changePassword,
    createUser, deleteUserById,
    getCurrentUser,
    getUserById, getUsersPaginated,
    updateCurrentUser, updateUserByAdmin,
    updateUserRole
} from "../controllers/userController.js";
import {loginUser} from "../controllers/authController.js";
import authorizeRoles from "../middlewares/auth/authorizeRoles.js";
import {authenticate} from "../middlewares/auth/auth.js";

const router = express.Router();

router.post(
    "/register",
    validateRequest(userSchema),
    mapToUserDTO,
    createUser);

router.post(
    '/auth/login',
    loginUser);

//Paginate All User
router.get(
    '/pages',
    authenticate,
    authorizeRoles('ADMIN'),
    getUsersPaginated
);

//Sisteme giris yapan kullanici
router.get(
    "/me",
    authenticate,
    getCurrentUser);

router.get(
    "/:userId",
    authenticate,
    authorizeRoles('ADMIN'),
    getUserById);

// ADMIN kullanici Role bilgisini degistirsin
router.put(
    '/:userId',
    authenticate,
    authorizeRoles('ADMIN'),
    updateUserRole
);

// ADMIN bir kullanicinin bilgilerini guncellesin
router.put(
    "/:userId",
    authenticate,
    authorizeRoles("ADMIN"),
    validateRequest(updateUserByAdminSchema),
    updateUserByAdmin
);

//giris yapan kullanici bilgilerini guncellesin
router.patch(
    '/me',
    authenticate,
    validateRequest(updateUserSchema),
    authorizeRoles('ADMIN', 'CUSTOMER'),
    updateCurrentUser);

//giris yapan kullanici password guncellesin
router.put(
    "/change-password",
    authenticate,
    validateRequest(changePasswordSchema),
    changePassword
);

router.delete(
    "/:userId",
    authenticate,
    authorizeRoles("ADMIN"),
    deleteUserById
);

export default router;
