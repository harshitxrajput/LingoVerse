import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending"
    }
}, { timestamps: true });

const friendRequestModel = mongoose.model("FriendRequest", friendRequestSchema);

export default friendRequestModel;