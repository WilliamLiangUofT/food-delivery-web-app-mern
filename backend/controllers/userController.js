import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const checkCookie = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const obtained_user = req.user;
        if (token) {
            return res.status(200).json({
                success: true,
                userInfo: obtained_user,
                message: "JWT HTTPOnly cookie exists"
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "JWT HTTPOnly cookie not found"
            })
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

export const authAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const matchingEmailFlag = email === process.env.ADMIN_EMAIL;
        const matchingPasswordsFlag = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
        if (matchingEmailFlag && matchingPasswordsFlag) {
            // const rolePayload = {
            //     role: "admin"
            // };
            // const token = jwt.sign(rolePayload, process.env.JWT_SECRET, {expiresIn: '2d'});
            // res.cookie('jwt', token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     maxAge: 172800000,
            //     sameSite: 'Strict'
            // });

            return res.status(200).json({
                success: true,
                message: "Admin logged in"
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

