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

function ShareModal({
  isOpen,
  onClose,
  title,
  location,
  price,
  url,
}) {
  if (!isOpen) return null;

  const details = `${title}

📍 ${location}

💰 ₹${price}

${url}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied successfully!");
    } catch (error) {
      alert("Unable to copy link.");
    }
  };

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(details);
      alert("Property details copied!");
    } catch (error) {
      alert("Unable to copy details.");
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

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(details)}`;
  };

  return (
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

        {/* Share Options */}

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
            onClick={shareEmail}
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
  );
}

export default ShareModal;