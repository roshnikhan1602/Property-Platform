const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const Property = require("../models/Property");
const PG = require("../models/PG");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const query = message.toLowerCase();

    let properties = [];
    let pgs = [];

    // Search only PGs
    if (
      query.includes("pg") ||
      query.includes("hostel")
    ) {
      pgs = await PG.find({
        isActive: true,
      }).select(
        "title city state locality rent sharingType genderPreference"
      );
    }

    // Search only Properties
    else if (
      query.includes("property") ||
      query.includes("house") ||
      query.includes("apartment") ||
      query.includes("villa") ||
      query.includes("plot")
    ) {
      properties = await Property.find({
        isActive: true,
      }).select(
        "title city state locality price propertyType bedrooms furnishing"
      );
    }

    // Otherwise search both
    else {
      properties = await Property.find({
        isActive: true,
      }).select(
        "title city state locality price propertyType bedrooms furnishing"
      );

      pgs = await PG.find({
        isActive: true,
      }).select(
        "title city state locality rent sharingType genderPreference"
      );
    }

    const propertyData =
      properties.length > 0
        ? properties
            .map(
              (p) => `
Property
Title: ${p.title}
Type: ${p.propertyType}
Bedrooms: ${p.bedrooms}
Furnishing: ${p.furnishing}
Price: ₹${p.price}
Location: ${p.locality}, ${p.city}, ${p.state}
`
            )
            .join("\n")
        : "No properties available.";

    const pgData =
      pgs.length > 0
        ? pgs
            .map(
              (pg) => `
PG
Title: ${pg.title}
Rent: ₹${pg.rent}
Sharing: ${pg.sharingType}
Gender: ${pg.genderPreference}
Location: ${pg.locality}, ${pg.city}, ${pg.state}
`
            )
            .join("\n")
        : "No PGs available.";

    const prompt = `
You are the official AI assistant of PropertyHub.

You have TWO responsibilities.

--------------------------------------------------

1. LISTING QUESTIONS

If the user is asking about:

- Properties
- Houses
- Apartments
- Villas
- Plots
- PGs
- Hostels
- Rent
- Sale
- Available listings

Use ONLY the PropertyHub listings provided below.

Never invent properties.

Never recommend external websites.

Never mention MagicBricks, 99acres, Housing.com, Stanza Living, Zolo or any other company.

If there is no matching listing, reply:

"Sorry, I couldn't find any matching listing in PropertyHub."

--------------------------------------------------

2. GENERAL REAL-ESTATE QUESTIONS

If the user asks about:

- Documentation
- Buying process
- Renting process
- Home loans
- Registration
- Legal advice
- Interior tips
- Property investment
- Real-estate guidance

Answer normally using your knowledge.

Do NOT force a PropertyHub listing into these answers.

--------------------------------------------------

AVAILABLE PROPERTIES

${propertyData}

--------------------------------------------------

AVAILABLE PGs

${pgData}

--------------------------------------------------

User Question:

${message}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    res.status(200).json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate response",
      error: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
};