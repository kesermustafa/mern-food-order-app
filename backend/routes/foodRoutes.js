import express from 'express';
import {
    getAllFoods,
    createFood,
    getFoodById,
    deleteFoodById,
    updateFoodById,
    patchFoodById
} from '../controllers/foodController.js';

import {foodSchema, partialFoodSchema} from '../models/validation/foodValidation.js';
import {validateRequest} from '../middlewares/validateRequest.js';
import {mapToDTO} from '../middlewares/validateAndMapToDTO.js';
import {validateObjectId} from "../middlewares/validateObjectId.js";
import {authenticate} from "../middlewares/auth/authenticate.js";
import authorizeRoles from "../middlewares/auth/authorizeRoles.js";

const router = express.Router();

router.get(
    '/',
    authenticate,
    authorizeRoles("CUSTOMER", "ADMIN"),
    getAllFoods);

router.get(
    '/:id',
    authenticate,
    authorizeRoles("CUSTOMER", "ADMIN"),
    validateObjectId,
    getFoodById);

router.post(
    '/',
    authenticate,
    authorizeRoles("ADMIN"),
    validateRequest(foodSchema),
    mapToDTO,
    createFood
);

router.put(
    '/:id',
    authenticate,
    authorizeRoles("ADMIN"),
    validateObjectId,
    validateRequest(foodSchema),
    mapToDTO,
    updateFoodById
);

router.patch(
    '/:id',
    authenticate,
    authorizeRoles("ADMIN"),
    validateObjectId,
    validateRequest(partialFoodSchema),
    mapToDTO,
    patchFoodById
);

router.delete(
    '/:id',
    authenticate,
    authorizeRoles("ADMIN"),
    validateObjectId,
    deleteFoodById
);

export default router;
