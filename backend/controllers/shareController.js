const transporter = require("../config/mailer");

const shareViaEmail = async (req, res) => {
  try {
    const {
      recipientEmail,
      title,
      location,
      price,
      url,
    } = req.body;

    if (!recipientEmail) {
      return res.status(400).json({
        success: false,
        message: "Recipient email is required.",
      });
    }

    await transporter.sendMail({
      from: `"PropertyHub" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `🏠 Check out this listing - ${title}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">
          <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;box-shadow:0 5px 15px rgba(0,0,0,0.1);">

            <h1 style="color:#2563eb;margin-bottom:10px;">
              🏠 PropertyHub
            </h1>

            <h2 style="margin-bottom:20px;">
              ${title}
            </h2>

            <p>
              <strong>📍 Location:</strong><br>
              ${location}
            </p>

            ${
              price
                ? `
                <p>
                  <strong>💰 Price:</strong><br>
                  ₹${Number(price).toLocaleString()}
                </p>
                `
                : ""
            }

            <p>
              Someone shared this listing with you.
            </p>

            <div style="margin:30px 0;text-align:center;">
              <a
                href="${url}"
                style="
                  background:#2563eb;
                  color:#ffffff;
                  padding:14px 28px;
                  text-decoration:none;
                  border-radius:8px;
                  display:inline-block;
                  font-weight:bold;
                "
              >
                View Listing
              </a>
            </div>

            <p style="font-size:13px;color:#666;">
              If the button doesn't work, copy and paste this link:
            </p>

            <p style="word-break:break-all;">
              ${url}
            </p>

          </div>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });

  } catch (error) {
    console.error("Share Email Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email.",
    });
  }
};

module.exports = {
  shareViaEmail,
};