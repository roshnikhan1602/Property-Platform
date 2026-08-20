import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaHome,
} from "react-icons/fa";

import Toast from "../common/Toast";

function PropertyCard({
  property,
  wishlistIds,
}) {
  const navigate = useNavigate();

  const propertyId =
    property._id?.$oid ||
    property._id?._id ||
    property._id;

  const [saved, setSaved] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setSaved(
      wishlistIds?.includes(property._id)
    );
  }, [wishlistIds, property._id]);

  const handleWishlist = async () => {
    try {
      const url = saved
        ? `${import.meta.env.VITE_API_URL}/api/wishlist/remove`
        : `${import.meta.env.VITE_API_URL}/api/wishlist/add`;

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        message: "Please login first",
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
    property.averageRating || 0;

  const filledStars =
    Math.floor(rating);

  const totalReviews =
    property.totalReviews || 0;

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

      <div
        onClick={() =>
          navigate(`/properties/${propertyId}`)
        }
        className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer w-full"
      >
        <div className="relative h-52 sm:h-56 overflow-hidden">
          {property.images &&
          property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title}
              onClick={() =>
                navigate(`/properties/${propertyId}`)
              }
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div
              onClick={() =>
                navigate(`/properties/${propertyId}`)
              }
              className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center cursor-pointer px-4 text-center"
            >
              <FaHome className="text-4xl sm:text-5xl text-blue-600" />

              <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium">
                Property Image Coming Soon
              </p>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWishlist();
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 p-2.5 sm:p-3 rounded-full shadow-md hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            {saved ? (
              <FaHeart className="text-red-500 text-lg sm:text-xl" />
            ) : (
              <FaRegHeart className="text-gray-600 text-lg sm:text-xl" />
            )}
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition line-clamp-2">
              {property.title}
            </h3>

            <span className="self-start bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              {property.listingType}
            </span>
          </div>

          <p className="text-gray-500 mt-2 flex items-start gap-2 text-sm sm:text-base">
            <FaMapMarkerAlt className="text-red-500 flex-shrink-0 mt-1" />

            <span>
              {property.locality},{" "}
              {property.city},{" "}
              {property.state}
            </span>
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Posted on {postedDate}
          </p>

          <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {property.propertyType}
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {property.area} sq.ft
            </span>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Starting From
              </p>

              <h4 className="text-2xl sm:text-3xl font-bold text-blue-600 break-words">
                ₹{" "}
                {property.price.toLocaleString()}
              </h4>
            </div>

            <div className="text-left sm:text-right pb-0 sm:pb-1">
              <div className="text-yellow-500 text-base sm:text-lg leading-none">
                {"★".repeat(filledStars)}
                {"☆".repeat(5 - filledStars)}
              </div>

              <span className="text-xs font-medium text-gray-500">
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