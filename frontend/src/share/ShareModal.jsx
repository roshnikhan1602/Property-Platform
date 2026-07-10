import { useState } from "react";
import {
  FaTimes,
  FaLink,
  FaCopy,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";

import QRCode from "react-qr-code";
import Toast from "../components/common/Toast";

function ShareModal({
  isOpen,
  onClose,
  title,
  location,
  price,
  url,
}) {
  const [showEmailForm, setShowEmailForm] =
    useState(false);

  const [recipientEmail, setRecipientEmail] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  if (!isOpen) return null;

  const details = `${title}

📍 ${location}

💰 ₹${price}

${url}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);

      setToast({
        show: true,
        message: "Link copied successfully!",
        type: "success",
      });
    } catch (error) {
      setToast({
        show: true,
        message: "Unable to copy link.",
        type: "error",
      });
    }
  };

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(
        details
      );

      setToast({
        show: true,
        message:
          "Details copied successfully!",
        type: "success",
      });
    } catch (error) {
      setToast({
        show: true,
        message:
          "Unable to copy details.",
        type: "error",
      });
    }
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        details
      )}`,
      "_blank"
    );
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(
        `${title}\n₹${price}`
      )}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  const sendEmail = async () => {
    if (!recipientEmail.trim()) {
      setToast({
        show: true,
        message:
          "Please enter recipient email.",
        type: "error",
      });

      return;
    }

    try {
      setSending(true);

      const response = await fetch(
        "http://localhost:5000/api/share/email",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            recipientEmail,
            title,
            location,
            price,
            url,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setToast({
          show: true,
          message:
            "Email sent successfully!",
          type: "success",
        });

        setRecipientEmail("");
        setShowEmailForm(false);
        
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setToast({
          show: true,
          message: data.message,
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          "Unable to send email.",
        type: "error",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">

          {/* Header */}

          <div className="flex justify-between items-center border-b px-6 py-4">

            <h2 className="text-xl font-bold">
              Share Listing
            </h2>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500"
            >
              <FaTimes size={22} />
            </button>

          </div>

          {/* Share Buttons */}

          <div className="grid grid-cols-2 gap-4 p-6">

            <button
              onClick={copyLink}
              className="border rounded-xl p-4 hover:bg-gray-100 transition flex flex-col items-center"
            >
              <FaLink
                size={28}
                className="text-blue-600"
              />

              <span className="mt-2">
                Copy Link
              </span>
            </button>

            <button
              onClick={copyDetails}
              className="border rounded-xl p-4 hover:bg-gray-100 transition flex flex-col items-center"
            >
              <FaCopy
                size={28}
                className="text-indigo-600"
              />

              <span className="mt-2">
                Copy Details
              </span>
            </button>

            <button
              onClick={shareWhatsApp}
              className="border rounded-xl p-4 hover:bg-green-50 transition flex flex-col items-center"
            >
              <FaWhatsapp
                size={30}
                className="text-green-600"
              />

              <span className="mt-2">
                WhatsApp
              </span>
            </button>

            <button
              onClick={shareTelegram}
              className="border rounded-xl p-4 hover:bg-blue-50 transition flex flex-col items-center"
            >
              <FaTelegram
                size={30}
                className="text-sky-500"
              />

              <span className="mt-2">
                Telegram
              </span>
            </button>

            <button
              onClick={shareFacebook}
              className="border rounded-xl p-4 hover:bg-blue-50 transition flex flex-col items-center"
            >
              <FaFacebook
                size={30}
                className="text-blue-700"
              />

              <span className="mt-2">
                Facebook
              </span>
            </button>

            <button
              onClick={() =>
                setShowEmailForm(
                  !showEmailForm
                )
              }
              className="border rounded-xl p-4 hover:bg-red-50 transition flex flex-col items-center"
            >
              <FaEnvelope
                size={30}
                className="text-red-600"
              />

              <span className="mt-2">
                Email
              </span>
            </button>

          </div>

          {/* Email Form */}

          {showEmailForm && (
            <div className="px-6 pb-6">

              <input
                type="email"
                placeholder="Enter recipient email"
                value={recipientEmail}
                onChange={(e) =>
                  setRecipientEmail(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={sendEmail}
                disabled={sending}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {sending
                  ? "Sending..."
                  : "Send Email"}
              </button>

            </div>
          )}

          {/* QR Code */}

          <div className="border-t px-6 py-6 flex flex-col items-center">

            <QRCode
              value={url}
              size={180}
            />

            <p className="mt-4 text-sm text-gray-600 text-center">
              Scan this QR Code to open
              this listing.
            </p>

          </div>

        </div>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              show: false,
              message: "",
              type: "success",
            })
          }
        />
      )}
    </>
  );
}

export default ShareModal;