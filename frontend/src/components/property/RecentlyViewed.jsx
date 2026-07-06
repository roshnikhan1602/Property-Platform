import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";

function RecentlyViewed() {
  const navigate = useNavigate();

  const [properties, setProperties] =
    useState([]);

  useEffect(() => {
    const loadRecentlyViewed = async () => {
      const recentlyViewed =
        JSON.parse(
          localStorage.getItem(
            "recentlyViewed"
          )
        ) || [];

      const validProperties = [];

      for (const property of recentlyViewed) {
        try {
         const response = await fetch(
  `http://localhost:5000/api/properties/${property._id}`,
  {
    credentials: "include",
  }
);

          if (response.ok) {
            validProperties.push(property);
          }
        } catch (error) {
          console.error(error);
        }
      }

      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(validProperties)
      );

      setProperties(validProperties);
    };

    loadRecentlyViewed();
  }, []);

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold">
          Recently Viewed
        </h2>

        <span className="text-gray-500">
          {properties.length} Properties
        </span>

      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">

        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-32">

              {property.images &&
              property.images.length > 0 ? (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <FaHome className="text-5xl text-blue-600" />
                </div>
              )}

            </div>

            <div className="p-3">

              <div className="flex justify-between items-start">

                <h3 className="font-semibold text-base line-clamp-1">
                  {property.title}
                </h3>

                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {property.propertyType}
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                {property.locality},{" "}
                {property.city}
              </p>

              <p className="text-blue-600 font-bold text-xl mt-3">
                ₹{" "}
                {property.price.toLocaleString()}
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/properties/${property._id}`
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