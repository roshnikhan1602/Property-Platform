const axios = require("axios");

const visualizeRoom = async (req, res) => {
  try {
    const {
      roomType,
      style,
      prompt,
    } = req.body;

    const finalPrompt = `
A highly realistic ${roomType} interior.

Interior Style:
${style}

Requirements:
${prompt}

Photorealistic.
Ultra detailed.
8K quality.
Modern architecture.
Professional interior photography.
Natural lighting.
Luxury furniture.
Wide angle.
`;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        inputs: finalPrompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        responseType: "arraybuffer",
      }
    );

    const imageBase64 = Buffer.from(
      response.data,
      "binary"
    ).toString("base64");

    res.json({
      success: true,
      image: `data:image/png;base64,${imageBase64}`,
    });

  } catch (error) {
    console.error(error.response?.data || error);

    res.status(500).json({
      success: false,
      message: "AI generation failed.",
    });
  }
};

module.exports = {
  visualizeRoom,
};