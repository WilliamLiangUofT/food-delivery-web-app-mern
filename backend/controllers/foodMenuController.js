import mongoose from "mongoose";
import foodMenuModel from "../models/foodMenuModel.js";
import fs from 'fs';
import path from "path";

export const addFoodDish = async (req, res, next) => {
    const image_file_name = `${req.file.filename}`;
    const newFoodDish = req.body;

    try {
        await foodMenuModel.create({
            name: newFoodDish.name,
            image: image_file_name,
            price: newFoodDish.price,
            description: newFoodDish.description,
            category: newFoodDish.category
        });

        res.status(201).json({
            success: true,
            message: "Food Added Successfully"
        });

    } catch (error) {
        res.status(400);
        throw new Error(error.message); // goes to error handler middleware
    }
    
};

export const getFoodDishes = async (req, res, next) => {
    try {
        const allFoodDishes = await foodMenuModel.find({});
        res.status(200).json({
            success: true, data: allFoodDishes
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};


export const removeFoodDish = async (req, res, next) => {
    try {
        const foodDish = await foodMenuModel.findById(req.body.id);
        const foodDishFilePath = path.join('uploads', foodDish.image);
        fs.unlink(foodDishFilePath, (err) => {
            if (err) {
                res.status(500);
                throw new Error(`Could not delete file: ${foodDishFilePath}`);
            }
        });

        const deletedDish = await foodMenuModel.findByIdAndDelete(req.body.id);
        
        if (deletedDish) {
            res.status(200).json({
                success: true,
                message: "Food Deleted Successfully"
            });
        } else {
            res.status(400);
            throw new Error(`Could not delete ${req.body.id}`);
        }

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};



