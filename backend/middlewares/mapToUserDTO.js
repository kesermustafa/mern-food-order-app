import UserDTO from "../models/dtos/UserDTO.js";

export const mapToUserDTO = (req, res, next) => {
    try {
        req.userDTO = UserDTO.fromPOJOtoDTO(req.body);
        next();
    } catch (err) {
        return res.status(400).json({message: "UserDTO dönüştürme hatası"});
    }
};
