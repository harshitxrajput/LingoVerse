import { generateStreamToken } from "../lib/stream.js";

export const getStreamTokenController = async (req, res) => {
    try{
        const token = generateStreamToken(req.user._id);

        res.status(200).json({ token })
    }
    catch(error){
        console.log("Error in getStreamTokenController: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}