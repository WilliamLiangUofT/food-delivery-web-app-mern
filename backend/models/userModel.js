import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const user_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {minimize: false});

user_schema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

user_schema.methods.matchPasswords = async function (plainPassword) {
    const passwordsSame = await bcrypt.compare(plainPassword, this.password);
    return passwordsSame;
}

const userModel = mongoose.models.User || mongoose.model("User", user_schema);

export default userModel;
