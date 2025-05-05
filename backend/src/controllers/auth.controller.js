import jwt from 'jsonwebtoken';

import userModel from "../models/user.model.js";

export const signupController = async (req, res) => {
    const { fullName, email, password } = req.body;

    try{
        if(!email || !fullName || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be of 6 characters long" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Invalid Email format" });
        }

        const existingUser = await userModel.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "Email already exists. Please use a different one" });
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await new userModel.create({
            email: email,
            fullName: fullName,
            password: password,
            profilePic: randomAvatar
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });

        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(201).json({ success: "true", user: newUser });
    }
    catch(error){
        console.log("Error in signupController: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const loginController = async (req, res) => {

}

export const logoutController = (req, res) => {

}