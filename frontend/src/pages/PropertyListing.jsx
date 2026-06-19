import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PropertyCard from "../components/home/PropertyCard";
import PropertyFilterBar from "../components/property/PropertyFilterBar";

function PropertyListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const city = searchParams.get("city");
  const propertyType =
    searchParams.get("propertyType") ||
    searchParams.get("type");

  const listingType =
    searchParams.get("listingType");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/properties"
        );

        const data = await response.json();

        if (data.success) {
          let filteredProperties =
            data.properties.filter(
              (property) =>
                property.isApproved
            );

          if (city) {
            filteredProperties =
              filteredProperties.filter(
                (property) =>
                  property.city
                    ?.toLowerCase()
                    .includes(
                      city.toLowerCase()
                    )
              );
          }

          if (propertyType) {
            filteredProperties =
              filteredProperties.filter(
                (property) =>
                  property.propertyType ===
                  propertyType
              );
          }

          if (listingType) {
            filteredProperties =
              filteredProperties.filter(
                (property) =>
                  property.listingType ===
                  listingType
              );
          }

          setProperties(filteredProperties);
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
  }, [city, propertyType, listingType]);

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold">
          All Properties
        </h1>

        <p className="mt-2 text-gray-600">
          Browse available properties.
        </p>

        <PropertyFilterBar />

        {(city ||
          propertyType ||
          listingType) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">

            {city && (
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                📍 {city}
              </span>
            )}

            {propertyType && (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                🏠 {propertyType}
              </span>
            )}

            {listingType && (
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
                📋 {listingType}
              </span>
            )}

            <button
              onClick={() =>
                navigate("/properties")
              }
              className="bg-red-100 text-red-600 px-4 py-2 rounded-full hover:bg-red-200 transition"
            >
              Clear Filters
            </button>

          </div>
        )}

        {loading ? (
          <p className="mt-10 text-center text-gray-500">
            Loading properties...
          </p>
        ) : properties.length === 0 ? (
          <div className="mt-16 text-center">

            <div className="text-6xl mb-4">
              🔍
            </div>

            <h2 className="text-2xl font-bold text-gray-700">
              No Similar Properties Found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your filters.
            </p>

          </div>
        ) : (
          <>
            <p className="mt-6 text-gray-600 font-medium">
              {properties.length} Properties Found
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

              {properties.map(
                (property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                )
              )}

            </div>
          </>
        )}

      </section>

      <Footer />
    </>
  );
}

export default PropertyListing;