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

          setProperties(
            approvedProperties.slice(0, 3)
          );
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
        <h2 className="text-3xl font-bold">
          Featured Properties
        </h2>

        <button
          onClick={() => navigate("/properties")}
          className="text-blue-600 font-medium hover:underline"
        >
          View All →
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">
          Loading properties...
        </p>
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