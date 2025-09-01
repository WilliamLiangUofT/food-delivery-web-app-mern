import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
    try {
        
        const { name, email, password } = req.body;
        
        let user;
        try {
            user = await userModel.create({
                name,
                email,
                password
            });
        } catch (error) {
            return res.status(200).json({
                success: false,
                message: error.message
            });
        }
        
        generateToken(res, user._id);

        res.status(201).json({
            success: true,
            message: `User: ${user._id} ${user.name} ${user.email} created sucessfully`,
            userInfo: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cartData: user.cartData
            }
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }

};

export const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user && await user.matchPasswords(password)) {
            generateToken(res, user._id);
            res.status(201).json({
                success: true,
                message: "User successfully logged in",
                userInfo: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    cartData: user.cartData
                }
            });
        } else {
            res.status(200).json({
                success: false,
                message: "Email or password is incorrect",
            });
        }

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

export const logoutUser = async (req, res, next) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        }); // clear the cookie

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
    
};

export const addCartItems = async (req, res, next) => {

};

export const removeCartItems = async (req, res, next) => {

};

export const getCartItems = async (req, res, next) => {
    const userInformation = req.user;
    res.status(200).json({
        cart_items: userInformation.cartData
    });
};

