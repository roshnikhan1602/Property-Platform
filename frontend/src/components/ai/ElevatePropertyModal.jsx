import { useState } from "react";

function ElevatePropertyModal({
  isOpen,
  onClose,
  propertyImage,
}) {
  const [selectedStyle, setSelectedStyle] =
    useState("Modern");

  const [customPrompt, setCustomPrompt] =
    useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-2xl w-full max-w-3xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6">
          ✨ Elevate My Property
        </h2>

        <p className="text-gray-600 mb-8">
          Let AI redesign this room so you can
          visualize its full potential before
          making a decision.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <h3 className="font-semibold mb-3">
              Current Image
            </h3>

            <img
              src={propertyImage}
              alt="Property"
              className="rounded-xl w-full h-72 object-cover border"
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Select Style
            </label>

            <select
              value={selectedStyle}
              onChange={(e) =>
                setSelectedStyle(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3 mb-5"
            >
              <option>Modern</option>
              <option>Luxury</option>
              <option>Minimalist</option>
              <option>Scandinavian</option>
              <option>Industrial</option>
              <option>Traditional</option>
            </select>

            <label className="block font-semibold mb-2">
              Additional Instructions
            </label>

            <textarea
              rows={6}
              placeholder="Example:
Add a sofa, TV unit, indoor plants and warm lighting..."
              value={customPrompt}
              onChange={(e) =>
                setCustomPrompt(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <button
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
            >
              ✨ Generate AI Design
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ElevatePropertyModal;