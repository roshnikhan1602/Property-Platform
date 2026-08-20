import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaHome,
  FaBed,
} from "react-icons/fa";

function RecentlyViewed() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadRecentlyViewed = async () => {
      const recentlyViewed =
        JSON.parse(
          localStorage.getItem("recentlyViewed")
        ) || [];

      const validItems = [];

      for (const item of recentlyViewed) {
        try {
          const url =
            item.itemType === "pg"
              ? `${import.meta.env.VITE_API_URL}/api/pgs/${item._id}`
              : `${import.meta.env.VITE_API_URL}/api/properties/${item._id}`;

          const response = await fetch(url, {
            credentials: "include",
          });

          const data = await response.json();

          if (
            response.ok &&
            (
              item.itemType === "pg"
                ? data.pg?.isApproved && data.pg?.isActive
                : data.property?.isApproved && data.property?.isActive
            )
          ) {
            validItems.push({
              ...item,
              listingAvailable:
                data.listingAvailable !== false,
            });
          }
        } catch (error) {
          console.error(error);
        }
      }

      setItems(validItems);
    };

    loadRecentlyViewed();
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Recently Viewed
        </h2>

        <span className="text-gray-500">
          {items.length} Items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            <div className="h-40 sm:h-32">
              {item.images &&
              item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  {item.itemType === "pg" ? (
                    <FaBed className="text-5xl text-blue-600" />
                  ) : (
                    <FaHome className="text-5xl text-blue-600" />
                  )}
                </div>
              )}
            </div>

            <div className="p-3">

              <div className="flex justify-between items-start gap-2">

                <h3 className="font-semibold text-base line-clamp-1 min-w-0">
                  {item.title}
                </h3>

                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full whitespace-nowrap">
                  {item.itemType === "pg"
                    ? "PG"
                    : item.propertyType}
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500 shrink-0" />
                <span className="truncate">
                  {item.locality}, {item.city}
                </span>
              </p>

              <p className="text-blue-600 font-bold text-xl mt-3">
                ₹{" "}
                {(
                  item.itemType === "pg"
                    ? item.rent
                    : item.price
                )?.toLocaleString()}
              </p>

              <button
                disabled={!item.listingAvailable}
                onClick={() =>
                  navigate(
                    item.itemType === "pg"
                      ? `/pgs/${item._id}`
                      : `/properties/${item._id}`
                  )
                }
                className={`mt-3 w-full py-2 rounded-lg transition ${
                  item.listingAvailable
                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {item.listingAvailable
                  ? "View"
                  : "Unavailable"}
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default RecentlyViewed;