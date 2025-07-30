import Food from '../models/Food.js';
import mongoose from 'mongoose';
import {HTTP_CODES, MESSAGE} from '../utils/ENUM.js';

// GET /api/foods
export const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: MESSAGE.DATA_NOT_FOUND});
    }
};

// POST /api/foods
export const createFood = async (req, res) => {
    try {
        const dto = req.foodDTO;

        const existing = await Food.findOne({name: new RegExp(`^${dto.name}$`, 'i')});
        if (existing) {
            return res.status(HTTP_CODES.CONFLICT).json({message: MESSAGE.CONFLICT_PRODUCT});
        }

        const newFood = new Food(dto.toPOJO());
        const saved = await newFood.save();

        res.status(HTTP_CODES.CREATED).json(saved);
    } catch (err) {
        console.error(MESSAGE.CREATED_ERROR, err);
        res.status(HTTP_CODES.INT_SERVER_ERROR).json({message: MESSAGE.SERVER_NOT_FOUND});
    }
};

// GET /api/foods/:id
export const getFoodById = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(HTTP_CODES.BAD_REQUEST).json({message: MESSAGE.ID_INVALID_ERROR});
    }

    try {
        const food = await Food.findById(id);

        if (!food) {
            return res.status(HTTP_CODES.NOT_FOUND).json({message: MESSAGE.NOT_FOUND_DATA});
        }

        res.json(food);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: MESSAGE.SERVER_NOT_FOUND});
    }
};

// DELETE /api/foods/:id
export const deleteFoodById = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: MESSAGE.ID_INVALID_ERROR});
    }

    try {
        const deleted = await Food.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({message: MESSAGE.DATA_NOT_FOUND});
        }

        res.json({message: MESSAGE.DELETE_SUCCESSFUL, deleted});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: MESSAGE.DELETE_ERROR});
    }
};

// PUT /api/foods/:id
export const updateFoodById = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: MESSAGE.ID_INVALID_ERROR});
    }

    try {
        const dto = req.foodDTO;

        const existing = await Food.findOne({name: new RegExp(`^${dto.name}$`, 'i')});
        if (existing && existing._id.toString() !== id) {
            return res.status(409).json({message: MESSAGE.CONFLICT_PRODUCT});
        }

        const updated = await Food.findByIdAndUpdate(id, dto.toPOJO(), {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({message: MESSAGE.DATA_NOT_FOUND});
        }

        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: MESSAGE.UPDATE_ERROR});
    }
};

// PATCH /api/foods/:id
export const patchFoodById = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: MESSAGE.ID_INVALID_ERROR});
    }

    try {
        const updated = await Food.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({message: MESSAGE.DATA_NOT_FOUND});
        }

        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: MESSAGE.UPDATE_ERROR});
    }
};