import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullName: {
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
        required: true,
        minlength: 6
    },

    bio: {
        type: String,
        default: ""
    },

    profilePic: {
        type: String,
        default: ""
    },

    nativeLanguage: {
        type: String,
        default: ""
    },

    learningLanguage: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        default: ""
    },

    isOnboarded: {
        type: Boolean,
        default: false
    },

    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ]
}, { timestamps: true });

//pre hook
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    }
    catch(error){
        next(error);
    }
});

userSchema.methods.comparePassword = async function(enteredPassword){
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
}

const userModel = mongoose.model("users", userSchema);

export default userModel;