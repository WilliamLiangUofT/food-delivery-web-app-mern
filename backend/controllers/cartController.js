import userModel from "../models/userModel.js";

export const addCartItems = async (req, res, next) => {
    try {
        const { item_id } = req.body;
        const user_id = req.user._id;

        await userModel.updateOne(
            {_id: user_id},
            {$inc: {[`cartData.${item_id}`]: 1}}
        );
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }

    res.status(200).json({
        success: true,
        message: "Added to user cart"
    });

};

export const removeCartItems = async (req, res, next) => {
    try {
        const { item_id } = req.body;
        const user_id = req.user._id;

        await userModel.updateOne(
            {_id: user_id},
            {$inc: {[`cartData.${item_id}`]: -1}}
        );

        await userModel.updateOne(
            {_id: user_id, [`cartData.${item_id}`]: {$lte: 0}}, // filter
            {$unset: {[`cartData.${item_id}`]: ""}} // the actual updating
        )

        res.status(200).json({
            success: true,
            message: "Removed from user cart"
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

export const getCartItems = async (req, res, next) => {
    try {
        const userInformation = req.user;
        res.status(200).json({
            success: true,
            cart_items: userInformation.cartData
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
    
};