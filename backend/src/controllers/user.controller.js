import friendRequestModel from "../models/friendRequest.js";
import userModel from "../models/user.model.js";

export const getRecommendedUsersController = async (req, res) => {
    try{
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await userModel.find({
            $and: [
                { _id: {$ne: currentUserId} },//exclude current user
                { _id: {$nin: currentUser.friends} },//exclude current user's friends
                { isOnboarded: true }
            ]
        });

        res.status(200).json(recommendedUsers);
    }
    catch(error){
        console.log("Error in getRecommendedUsersController: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyFriendsController = async (req, res) => {
    try{
        const user = await userModel.findById(req.user._id).select("friends").populate("friends", "fullName, profilePic nativeLanguage, learningLanguage");

        res.status(200).json(user.friends);
    }
    catch(error){
        console.log("Error in getMyFriendsController: ", error.message);
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
        console.log("Error in sendFriendRequestController: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const acceptFriendRequestController = async (req, res) => {
    try{
        const { id:requestId } = req.params;

        const friendRequest = await friendRequestModel.findById(requestId);
        if(!friendRequest) return res.status(404).json({ message: "Friend Request not found" });
        if(friendRequest.recipient.toString() !== req.user._id){
            return res.status(403).json({ message: "You are not authorized to accept this request" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        //addToSet is a method that adds elements to an array only if they do not already exists
        await userModel.findByIdAndUpdate(friendRequest.sender, {       //adding id of the user in the friends array of current user
            $addToSet: { friends: friendRequest.sender }
        });

        await userModel.findByIdAndUpdate(friendRequest.recipient, {    //adding id of the user in the friends array of requested user
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({ message: "Friend request accepted" });
    }
    catch(error){
        console.log("Error in acceptFriendRequestController: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getFriendRequestController = async (req, res) => {
    try{
        const incomingRequests = await friendRequestModel.find({
            recipient: req.user._id,
            status: "pending"
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptedRequests = await friendRequestModel.find({
            recipient: req.user._id,
            status: "accepted"
        }).populate("sender", "fullName, profilePic");

        res.status(200).json({ incomingRequests, acceptedRequests });
    }
    catch(error){
        console.log("Error in getFriendRequestController: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getOutgoingFriendRequestController = async (req, res) => {
    try{
        const outgoingRequests = await friendRequestModel.find({
            sender: req.user._id,
            status: "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);
    }
    catch(error){
        console.log("Error in getOutgoingFriendRequestController: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}