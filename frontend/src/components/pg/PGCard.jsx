import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaWifi,
  FaSnowflake,
  FaUtensils,
  FaBed,
  FaHeart,
  FaRegHeart,
  FaDumbbell,
  FaTv,
  FaVideo,
} from "react-icons/fa";

import Toast from "../common/Toast";

function PGCard({ pg }) {
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (!pg) return;

    const checkWishlist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/wishlist`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data.success) {
          const exists = data.wishlist.some(
            (item) =>
              item.itemType === "PG" &&
              item.itemId?._id === pg._id
          );

          setSaved(exists);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkWishlist();
  }, [pg]);

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
          itemId: pg._id,
          itemType: "PG",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSaved(!saved);

        setToast({
          show: true,
          message: saved
            ? "PG removed from wishlist"
            : "PG added to wishlist",
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

  if (!pg) return null;

  const postedDate = pg.createdAt
    ? new Date(pg.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "N/A";

  const filledStars = Math.round(
    pg.averageRating || 0
  );

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
          navigate(`/pgs/${pg._id}`)
        }
        className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"
      >
        <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300 z-10 pointer-events-none"></div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWishlist();
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition cursor-pointer"
          >
            {saved ? (
              <FaHeart className="text-red-500 text-base sm:text-lg" />
            ) : (
              <FaRegHeart className="text-gray-500 text-base sm:text-lg" />
            )}
          </button>

          {pg.images && pg.images.length > 0 ? (
            <img
              src={pg.images[0]}
              alt={pg.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center">
              <FaBed className="text-4xl sm:text-5xl text-blue-600" />

              <p className="mt-3 text-gray-600 font-medium text-sm sm:text-base text-center px-4">
                PG Image Coming Soon
              </p>
            </div>
          )}

        </div>

        <div className="p-4 sm:p-5">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">

            <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition break-words">
              {pg.title}
            </h3>

            <span className="self-start bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              {pg.sharingType}
            </span>

          </div>

          <p className="text-gray-500 mt-2 flex items-start gap-2 text-sm sm:text-base">
            <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
            <span>
              {pg.locality}, {pg.city}
            </span>
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Posted on {postedDate}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
              {pg.genderPreference === "Unisex"
                ? "Co-live"
                : pg.genderPreference}
            </span>

            {pg.wifiAvailable && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <FaWifi />
                WiFi
              </span>
            )}

            {pg.acAvailable && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <FaSnowflake />
                AC
              </span>
            )}

            {pg.foodAvailable && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <FaUtensils />
                Food
              </span>
            )}

            {pg.gymAvailable && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <FaDumbbell />
                Gym
              </span>
            )}

            {pg.swimmingPoolAvailable && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                Pool
              </span>
            )}

            {pg.tvAvailable && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <FaTv />
                TV
              </span>
            )}

            {pg.cctvAvailable && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <FaVideo />
                CCTV
              </span>
            )}

          </div>

          <div className="mt-5">

            <p className="text-sm text-gray-500">
              Monthly Rent
            </p>

            <h4 className="text-2xl sm:text-3xl font-bold text-blue-600">
              ₹ {pg.rent?.toLocaleString() || 0}
            </h4>

          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-5">

            <div>
              <p className="text-sm text-gray-500">
                Security Deposit
              </p>

              {Number(pg.depositAmount) > 0 ? (
                <p className="font-semibold text-gray-800 mt-1">
                  ₹ {pg.depositAmount.toLocaleString()}
                </p>
              ) : (
                <p className="font-semibold text-gray-800 mt-1">
                  No Deposit
                </p>
              )}
            </div>

            <div className="text-left sm:text-right">
              <div className="text-yellow-500 text-lg leading-none">
                {"★".repeat(filledStars)}
                {"☆".repeat(5 - filledStars)}
              </div>

              <p className="text-xs font-medium text-gray-500 mt-1">
                {Number(pg.averageRating || 0).toFixed(1)} Rating
              </p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default PGCard;