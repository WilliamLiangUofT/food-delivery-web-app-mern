import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const payload = { userId };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30d'});
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 2592000000,
        sameSite: 'Strict'
    });
};

export default generateToken;
