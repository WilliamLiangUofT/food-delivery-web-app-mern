import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

let stripe;
const getStripe = () => {
    if (!stripe) {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return stripe;
};

export const placeOrder = async (req, res, next) => {
    try {
        const { userId, items, subTotalAmount, deliveryFee, address } = req.body;

        const new_order = await orderModel.create({
            userId,
            items,
            subTotalAmount,
            deliveryFee,
            address
        });

        await userModel.updateOne(
            {_id: userId},
            {cartData: {}}
        );

        const line_items = items.map((element, index) => ({
            price_data: {
                currency: "cad",
                product_data: {
                    name: element.name
                },
                unit_amount: element.price * 100
            },
            quantity: element.quantity
        }));

        line_items.push({
            price_data: {
                currency: "cad",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryFee*100
            },
            quantity: 1
        });

        const session = await getStripe().checkout.sessions.create({
            mode: "payment",
            line_items: line_items,
            success_url: `${process.env.FRONTEND_ORIGIN}/verify?success=true&orderId=${new_order._id}`,
            cancel_url: `${process.env.FRONTEND_ORIGIN}/verify?success=false&orderId=${new_order._id}`
        });

        res.status(200).json({
            success: true,
            sessionURL: session.url
        });

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};


