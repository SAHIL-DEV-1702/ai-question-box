import axios from "axios";
import Prompt from "../models/promptModle.js";
export const askAI = async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "google/gemma-3n-e2b-it:free",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                },
            }
        );

        const aiText = response.data.choices[0].message.content;

        res.json({ response: aiText });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error in AI request");
    }
};


export const savePrompt = async (req, res) => {
    try {
        const { prompt, response } = req.body;

        const newData = new Prompt({ prompt, response });
        await newData.save();

        res.json(newData);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error saving data");
    }
};