import friendRequestModel from "../models/friendRequest.js";
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

export const sendFriendRequestController = async (req, res) => {
    try{
        const myId = req.user._id;
        const { id:recipientId } = req.params;

        if(myId === recipientId) return res.status(400).json({ message: "You can't send friend request to yourself" });

        const recipient = await userModel.findById(recipientId);
        if(!recipient) return res.status(404).json({ message: "Recipient not found" });
        if(recipient.friends.includes(myId)) return res.status(400).json({ message: "You already are friends with this user" });

        const existingRequest = await friendRequestModel.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        });

        if(existingRequest) return res.status(400).json({ message: "A friend request already exists between you and this user" });

        const friendRequest = await friendRequestModel.create({
            sender: myId,
            recipient: recipientId
        });

        res.status(201).json(friendRequest);
    }
    catch(error){
        console.log("Error in sendFriendRequestController: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}