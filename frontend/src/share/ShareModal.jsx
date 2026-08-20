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
      await navigator.clipboard.writeText(details);

      setToast({
        show: true,
        message: "Details copied successfully!",
        type: "success",
      });
    } catch (error) {
      setToast({
        show: true,
        message: "Unable to copy details.",
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
        message: "Please enter recipient email.",
        type: "error",
      });

      return;
    }

    try {
      setSending(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/share/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      const data = await response.json();

      if (data.success) {
        setToast({
          show: true,
          message: "Email sent successfully!",
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
        message: "Unable to send email.",
        type: "error",
      });
    } finally {
      setSending(false);
    }
  };

  const shareOptions = [
    {
      label: "Copy Link",
      icon: <FaLink />,
      color: "text-blue-600",
      hover: "hover:bg-blue-50",
      action: copyLink,
    },
    {
      label: "Copy Details",
      icon: <FaCopy />,
      color: "text-indigo-600",
      hover: "hover:bg-indigo-50",
      action: copyDetails,
    },
    {
      label: "WhatsApp",
      icon: <FaWhatsapp />,
      color: "text-green-600",
      hover: "hover:bg-green-50",
      action: shareWhatsApp,
    },
    {
      label: "Telegram",
      icon: <FaTelegram />,
      color: "text-sky-500",
      hover: "hover:bg-sky-50",
      action: shareTelegram,
    },
    {
      label: "Facebook",
      icon: <FaFacebook />,
      color: "text-blue-700",
      hover: "hover:bg-blue-50",
      action: shareFacebook,
    },
    {
      label: "Email",
      icon: <FaEnvelope />,
      color: "text-red-600",
      hover: "hover:bg-red-50",
      action: () =>
        setShowEmailForm(!showEmailForm),
    },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

          {/* Header */}

          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Share Listing
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                Share this listing with others
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition"
            >
              <FaTimes size={15} />
            </button>

          </div>

          {/* Share Options */}

          <div className="grid grid-cols-3 gap-3 p-5">

            {shareOptions.map((option) => (
              <button
                key={option.label}
                onClick={option.action}
                className={`h-24 rounded-xl border border-gray-200 ${option.hover} flex flex-col items-center justify-center transition`}
              >
                <span
                  className={`${option.color} text-xl`}
                >
                  {option.icon}
                </span>

                <span className="text-xs font-medium text-gray-700 mt-2">
                  {option.label}
                </span>
              </button>
            ))}

          </div>

          {/* Email Form */}

          {showEmailForm && (
            <div className="px-5 pb-5">

              <div className="border border-gray-200 bg-gray-50 rounded-xl p-4">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Email
                </label>

                <input
                  type="email"
                  placeholder="Enter recipient email"
                  value={recipientEmail}
                  onChange={(e) =>
                    setRecipientEmail(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                />

                <button
                  onClick={sendEmail}
                  disabled={sending}
                  className="w-full mt-3 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {sending
                    ? "Sending..."
                    : "Send Email"}
                </button>

              </div>

            </div>
          )}

          {/* QR Code */}

          <div className="border-t border-gray-200 px-5 py-5 flex flex-col items-center">

            <div className="p-3 border border-gray-200 rounded-xl bg-white">
              <QRCode
                value={url}
                size={140}
              />
            </div>

            <p className="mt-3 text-xs text-gray-500 text-center">
              Scan to open this listing
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