import jwt from 'jsonwebtoken';

import userModel from '../models/user.model.js';

export const isLoggedIn = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await userModel.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();
    }
    catch(error){
        console.log("Error in isLoggedIn function: ", error);
        res.status(401).json({ error: "Internal Server Error" });
    }
}