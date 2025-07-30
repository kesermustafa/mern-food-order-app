// middlewares/validateAndMapToDTO.js
import FoodDTO from "../models/dtos/FoodDTO.js";

export const mapToDTO = (req, res, next) => {
    try {
        req.foodDTO = FoodDTO.fromPOJO(req.body);
        next();
    } catch (err) {
        return res.status(400).json({message: "DTO dönüştürme hatası"});
    }
};
