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
          localStorage.getItem(
            "recentlyViewed"
          )
        ) || [];

      const validItems = [];

      for (const item of recentlyViewed) {
        try {
          const url =
            item.itemType === "pg"
              ? `http://localhost:5000/api/pgs/${item._id}`
              : `http://localhost:5000/api/properties/${item._id}`;

          const response = await fetch(url, {
            credentials: "include",
          });

          if (response.ok) {
            validItems.push(item);
          }
        } catch (error) {
          console.error(error);
        }
      }

      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(validItems)
      );

      setItems(validItems);
    };

    loadRecentlyViewed();
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">
          Recently Viewed
        </h2>

        <span className="text-gray-500">
          {items.length} Items
        </span>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-32">
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
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-base line-clamp-1">
                  {item.title}
                </h3>

                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {item.itemType === "pg"
                    ? "PG"
                    : item.propertyType}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                {item.locality}, {item.city}
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
                onClick={() =>
                  navigate(
                    item.itemType === "pg"
                      ? `/pgs/${item._id}`
                      : `/properties/${item._id}`
                  )
                }
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewed;