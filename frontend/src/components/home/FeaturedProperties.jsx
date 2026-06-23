import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PropertyCard from "./PropertyCard";

function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/properties"
        );

        const data = await response.json();

        if (data.success) {
          const approvedProperties =
            data.properties.filter(
              (property) => property.isApproved
            );

          const latestProperties =
            approvedProperties
              .sort(
                (a, b) =>
                  new Date(b.createdAt) -
                  new Date(a.createdAt)
              )
              .slice(0, 3);

          setProperties(latestProperties);
        }
      } catch (error) {
        console.error(
          "Error fetching properties:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold text-gray-900">
          Featured Properties
        </h2>

        <button
          onClick={() =>
            navigate("/properties")
          }
          className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition cursor-pointer"
        >
          View All →
        </button>

      </div>

      {loading ? (
        <div className="flex justify-center py-10">

          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        </div>
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-500">
          No approved properties found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default FeaturedProperties;