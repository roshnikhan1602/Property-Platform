import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PropertyCard from "../components/home/PropertyCard";

function PropertyListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/properties"
        );

        const data = await response.json();

        if (data.success) {
          setProperties(data.properties);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold">
          All Properties
        </h1>

        <p className="mt-2 text-gray-600">
          Browse available properties.
        </p>

        {loading ? (
          <p className="mt-10 text-center text-gray-500">
            Loading properties...
          </p>
        ) : properties.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">
            No properties found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default PropertyListing;