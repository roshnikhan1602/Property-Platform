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

  const loggedInUser = JSON.parse(
    localStorage.getItem("user")
  );

  const userId = loggedInUser?._id;

  useEffect(() => {
    if (!userId || !pg) return;

    const checkWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/wishlist/${userId}`
        );

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
  }, [pg, userId]);

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
        message:
          "Something went wrong",
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

        <FaBed className="text-5xl text-blue-600" />

        <p className="mt-3 text-gray-600 font-medium">
          PG Image Coming Soon
        </p>

      </div>

        <div className="p-5">

          <div className="flex justify-between items-start gap-3">

            <h3 className="text-xl font-bold text-gray-800">
              {pg.title}
            </h3>

            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              {pg.sharingType}
            </span>

          </div>

          <p className="text-gray-500 mt-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            {pg.locality}, {pg.city}
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

          </div>

          <div className="mt-5">

            <p className="text-sm text-gray-500">
              Monthly Rent
            </p>

            <h4 className="text-3xl font-bold text-blue-600">
              ₹ {pg.rent?.toLocaleString() || 0}
            </h4>

          </div>

          {pg.depositAmount && (
            <div className="mt-3">

              <p className="text-sm text-gray-500">
                Security Deposit
              </p>

              <p className="font-semibold text-gray-800">
                ₹ {pg.depositAmount.toLocaleString()}
              </p>

            </div>
          )}

          <button
            onClick={() =>
              navigate(`/pgs/${pg._id}`)
            }
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition cursor-pointer"
          >
            View PG Details
          </button>

        </div>

      </div>
    </>
  );
}

export default PGCard;