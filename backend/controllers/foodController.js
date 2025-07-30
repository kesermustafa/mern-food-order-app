import Food from '../models/Food.js';

// GET /api/foods
export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({message: 'Bir hata oluştu'});
    }
};

// POST /api/foods
export const createFood = async (req, res) => {
    try {
        const {name, price, description, image} = req.body;

        // Basit doğrulama
        if (!name || !price) {
            return res.status(400).json({message: 'İsim ve fiyat zorunludur'});
        }

        const newFood = new Food({
            name,
            price,
            description,
            image,
        });

        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (err) {
        res.status(500).json({message: 'Yemek eklenirken hata oluştu'});
    }
};
