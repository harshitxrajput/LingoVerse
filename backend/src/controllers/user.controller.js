import userModel from "../models/user.model.js";

export const getRecommendedUsersController = async (req, res) => {
    try{
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await userModel.find({
            $and: [
                {_id: {$ne: currentUserId}},//exclude current user
                {$id: {$nin: currentUser.friends}},//exclude current user's friends
                {isOnboarded: true}
            ]
        });

        res.status(200).json(recommendedUsers);
    }
    catch(error){
        console.log("Error in getRecommendedUsersController: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyFriendsController = async (req, res) => {
    try{
        const user = await userModel.findById(req.user._id).select("friends").populate("friends", "fullName, profilePic nativeLanguage, learningLanguage");

        res.status(200).json(user.friends);
    }
    catch(error){
        console.log("Error in getMyFriendsController: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}