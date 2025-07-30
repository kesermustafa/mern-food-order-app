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
import {validateObjectId} from '../middlewares/validateObjectId.js';
import {mapToDTO} from '../middlewares/validateAndMapToDTO.js';

const router = express.Router();

// GET tüm yemekler
router.get('/', getAllFoods);

// GET id ile
router.get('/:id', validateObjectId, getFoodById);

// POST yeni yemek
router.post(
    '/',
    validateRequest(foodSchema),
    mapToDTO,
    createFood
);

// PUT tam güncelleme
router.put(
    '/:id',
    validateObjectId,
    validateRequest(foodSchema),
    mapToDTO,
    updateFoodById
);

// PATCH kısmi güncelleme
router.patch(
    '/:id',
    validateObjectId,
    validateRequest(partialFoodSchema),
    mapToDTO,
    patchFoodById
);

// DELETE
router.delete('/:id', validateObjectId, deleteFoodById);

export default router;
