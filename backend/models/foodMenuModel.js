import mongoose, { mongo } from "mongoose"

const food_menu_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const foodMenuModel = mongoose.models.foodmenu || mongoose.model("foodmenu", food_menu_schema);

export default foodMenuModel;
