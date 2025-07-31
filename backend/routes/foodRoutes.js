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

import verifyToken from "../middlewares/auth/verifyToken.js";
import authorizeRoles from "../middlewares/auth/authorizeRoles.js";

const router = express.Router();

router.get('/', verifyToken, authorizeRoles("CUSTOMER", "ADMIN"), getAllFoods);

router.get('/:id', verifyToken, authorizeRoles("CUSTOMER", "ADMIN"), validateObjectId, getFoodById);

router.post(
    '/',
    verifyToken,
    authorizeRoles("ADMIN"),
    validateRequest(foodSchema),
    mapToDTO,
    createFood
);

router.put(
    '/:id',
    verifyToken,
    authorizeRoles("ADMIN"),
    validateObjectId,
    validateRequest(foodSchema),
    mapToDTO,
    updateFoodById
);

router.patch(
    '/:id',
    verifyToken,
    authorizeRoles("ADMIN"),
    validateObjectId,
    validateRequest(partialFoodSchema),
    mapToDTO,
    patchFoodById
);

router.delete(
    '/:id',
    verifyToken,
    authorizeRoles("ADMIN"),
    validateObjectId,
    deleteFoodById
);

export default router;
