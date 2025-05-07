import jwt from 'jsonwebtoken';

import userModel from "../models/user.model.js";
import { createStreamUser } from '../lib/stream.js';

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

        const newUser = await userModel.create({
            email: email,
            fullName: fullName,
            password: password,
            profilePic: randomAvatar
        });

        try{                                                            //creating stream user for video calling
            await createStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || ""
            });
            console.log(`Stream user created for ${newUser.fullName}`);
        }
        catch(error){
            console.log("Error in creating Stream user: ", error);
        }
        
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });
        
        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });
        
        await newUser.save();
        res.status(201).json({ success: "true", user: newUser });
    }
    catch(error){
        console.log("Error in signupController: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const loginController = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            samesite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ success: "true", user });
    }
    catch(error){
        console.log("Error in loginController: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logoutController = (req, res) => {
    try{
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch(error){
        console.log("Error in logoutController: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const onboardController = async (req, res) => {
    try{
        const userId = req.user._id;

        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;
        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({
                message: "All fileds are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean)
            });
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true,
        }, { new: true });

        if(!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }

        try{
            await createStreamUser({                                    //updating stream user for video calling
                id: updatedUser._id,
                name: updatedUser.fullName,
                image: updatedUser.profilePIc || "",
            });
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
        }
        catch(streamError){
            console.log("Error in updating stream user:", streamError);
        }

        res.status(200).json({ success: "true", user: updatedUser });
    }
    catch(error){
        console.log("Error in onboardController: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const profileController = (req, res) => {
    res.status(200).json({ success: "true", user: req.user });
}