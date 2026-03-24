import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
    {
        prompt: {
            type: String,
            required: true,
            trim: true,
        },
        response: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, 
    }
);

const Prompt = mongoose.model("Prompt", promptSchema);

export default Prompt;