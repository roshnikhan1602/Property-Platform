import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaHome,
} from "react-icons/fa";

import Toast from "../common/Toast";

function PropertyCard({ property }) {
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const loggedInUser = JSON.parse(
    localStorage.getItem("user")
  );

  const userId = loggedInUser?._id;

  useEffect(() => {
    if (!userId) return;

    const checkWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/wishlist/${userId}`
        );

        const data = await response.json();

        if (data.success) {
          const exists =
            data.wishlist.some(
              (item) =>
                item.itemType === "Property" &&
                item.itemId?._id === property._id
            );

          setSaved(exists);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkWishlist();
  }, [property._id, userId]);

  const handleWishlist = async () => {
    if (!userId) {
      setToast({
        show: true,
        message: "Please login first",
        type: "error",
      });

      return;
    }

    try {
      const url = saved
        ? "http://localhost:5000/api/wishlist/remove"
        : "http://localhost:5000/api/wishlist/add";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId,
          itemId: property._id,
          itemType: "Property",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSaved(!saved);

        setToast({
          show: true,
          message: saved
            ? "Property removed from wishlist"
            : "Property added to wishlist",
          type: "success",
        });
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
          "Something went wrong",
        type: "error",
      });
    }
  };

  const postedDate =
    property.createdAt
      ? new Date(
          property.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "N/A";

  const rating =
    property.rating || 4.5;

  const filledStars =
    Math.floor(rating);

  return (
    <>
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

      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300">

        <div className="relative h-56 bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center">

          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-md hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            {saved ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-600 text-xl" />
            )}
          </button>

          <FaHome className="text-5xl text-blue-600" />

          <p className="mt-3 text-gray-600 font-medium">
            Property Image Coming Soon
          </p>

        </div>

        <div className="p-5">

          <div className="flex justify-between items-start gap-3">

            <h3 className="text-xl font-bold text-gray-800">
              {property.title}
            </h3>

            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              {property.listingType}
            </span>

          </div>

          <p className="text-gray-500 mt-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            {property.locality},{" "}
            {property.city},{" "}
            {property.state}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Posted on {postedDate}
          </p>

          <div className="mt-4 flex justify-between text-sm text-gray-600">

            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {property.propertyType}
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {property.area} sq.ft
            </span>

          </div>

          <div className="mt-5">

            <p className="text-sm text-gray-500">
              Starting From
            </p>

            <h4 className="text-3xl font-bold text-blue-600">
              ₹{" "}
              {property.price.toLocaleString()}
            </h4>

          </div>

          <div className="flex items-center justify-between mt-6">

            <button
              onClick={() =>
                navigate(
                  `/properties/${property._id}`
                )
              }
              className="bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition cursor-pointer"
            >
              View Details
            </button>

            <div className="text-right">

              <div className="text-yellow-500 text-2xl">
                {"★".repeat(
                  filledStars
                )}
                {"☆".repeat(
                  5 - filledStars
                )}
              </div>

              <span className="text-sm font-medium text-gray-600">
                {rating} Rating
              </span>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default PropertyCard;