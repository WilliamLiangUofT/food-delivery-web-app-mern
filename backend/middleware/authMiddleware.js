import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

const authProtect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Unauthorized 401: No JWT Token"
            });
        }
        
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); // decoded payload is {userId: userId}
            req.user = await userModel.findById(decodedPayload.userId);
        } catch (error) {
            return res.status(200).json({
                success: false,
                message: "Unauthorized 401: Invalid JWT Token"
            })
        }
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }

    next();
};

export { authProtect };
