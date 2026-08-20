const axios = require("axios");

const sendEmail = async (to, subject, html) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name:
            process.env.BREVO_SENDER_NAME ||
            "PropertyHub",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("Email sent successfully");
  } catch (error) {
    console.error(
      "Email error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = sendEmail;