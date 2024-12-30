const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

/**
 * Analyze an image or description by processing it through the GoogleGenerativeAI.
 * 
 * @param {string} imagePath - The path to the image file (optional).
 * @param {string} description - The text description of symptoms (optional).
 * @returns {Promise<Object>} - The analysis result with diagnosis, precautions, and treatment.
 */
const analyzeImageOrText = async (imagePath, description) => {
  try {
    const input = [];

    // Add description input, if provided
    if (description) {
      input.push(description);
    }

    // Add image input, if provided
    if (imagePath) {
      const fs = require("fs");
      const imageBuffer = fs.readFileSync(imagePath);

      input.push({
        inlineData: {
          data: Buffer.from(imageBuffer).toString("base64"),
          mimeType: "image/jpeg", // Ensure the mimeType matches the image type
        },
      });
    }

    // Add the task instruction for the generative model
    input.push("Analyze the input and provide a diagnosis, precautions, and treatment.");

    // Generate content using the model
    const result = await model.generateContent(input);

    // Extract and parse the response
    const responseText = result.response.text();

    // Split the result into diagnosis, precautions, and treatment
    const [diagnosis, precautions, treatment] = responseText.split("\n").map((line) => line.trim());

    return {
      diagnosis: diagnosis || "No diagnosis provided",
      precautions: precautions || "No precautions provided",
      treatment: treatment || "No treatment provided",
    };
  } catch (error) {
    console.error("Error analyzing the input:", error.message);
    return {
      diagnosis: "Unable to analyze the input",
      precautions: "N/A",
      treatment: "N/A",
    };
  }
};

module.exports = analyzeImageOrText;