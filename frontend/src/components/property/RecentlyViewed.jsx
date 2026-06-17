import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecentlyViewed() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const recentlyViewed =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        )
      ) || [];

    setProperties(recentlyViewed);
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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
          >

            <div className="flex items-center gap-3">

              <div className="text-3xl">
                🏠
              </div>

              <div>

                <h3 className="font-semibold text-lg line-clamp-1">
                  {property.title}
                </h3>

                <p className="text-sm text-gray-500">
                  📍 {property.city}
                </p>

              </div>

            </div>

            <p className="text-blue-600 font-bold text-lg mt-4">
              ₹ {property.price.toLocaleString()}
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
        ))}

      </div>

    </section>
  );
}

export default RecentlyViewed;