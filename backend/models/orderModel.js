import mongoose from "mongoose";

const order_schema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    subTotalAmount: {
        type: Number,
        required: true
    },
    deliveryFee: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    order_status: {
        type: String,
        default: "Order Processing"
    },
    date: {
        type: Date,
        default: Date.now
    },
    payment: {
        type: Boolean,
        default: false
    }
});

const orderModel = mongoose.models.order || mongoose.model("order", order_schema);

export default orderModel;
