import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PropertyCard from "../components/home/PropertyCard";
import PropertyFilterBar from "../components/property/PropertyFilterBar";

function PropertyListing({
  setShowLoginModal,
}) {
  const [properties, setProperties] = useState([]);
  const [totalProperties, setTotalProperties] =
  useState(0);
  const [totalPages, setTotalPages] =
  useState(1);
  const [loading, setLoading] = useState(true);

const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const city = searchParams.get("city");

  const locality =
   searchParams.get("locality");

  const propertyType =
    searchParams.get("propertyType") ||
    searchParams.get("type");

  const listingType =
    searchParams.get("listingType");

  const minPrice =
    searchParams.get("minPrice");

  const maxPrice =
    searchParams.get("maxPrice");

  const page =
  Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

      const params = new URLSearchParams();

params.append("page", page);
params.append("limit", 9);

if (city) params.append("city", city);
if (locality)
  params.append("locality", locality);
if (propertyType)
  params.append("propertyType", propertyType);
if (listingType)
  params.append("listingType", listingType);
if (minPrice)
  params.append("minPrice", minPrice);
if (maxPrice)
  params.append("maxPrice", maxPrice);

const response = await fetch(
  `http://localhost:5000/api/properties?${params.toString()}`
);

const data = await response.json();

if (data.success) {
  setProperties(data.properties);
   setTotalProperties(data.totalProperties);
  setTotalPages(data.totalPages);
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
  },[
  city,
  locality,
  propertyType,
  listingType,
  minPrice,
  maxPrice,
  page,
]);

  return (
    <>
    <Navbar
  setShowLoginModal={
    setShowLoginModal
  }
/>

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
          locality ||
          propertyType ||
          listingType ||
          minPrice ||
          maxPrice) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">

            {city && (
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                📍 {city}
              </span>
            )}

            {locality && (
              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
                🏘️ {locality}
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

            {(minPrice || maxPrice) && (
              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                💰 Price Filter Applied
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
              No Properties Found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your filters.
            </p>

          </div>
        ) : (
          <>
            <p className="mt-6 text-gray-600 font-medium">
  Showing {properties.length} of {totalProperties} Properties
</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

  {properties.map((property) => (
    <PropertyCard
      key={property._id}
      property={property}
    />
  ))}

</div>

<div className="flex justify-center items-center gap-3 mt-10">

  <button
    disabled={page === 1}
    onClick={() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page - 1);
      setSearchParams(params);
    }}
    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
  >
    Previous
  </button>

  <span className="font-medium">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page + 1);
      setSearchParams(params);
    }}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
  >
    Next
  </button>

</div>

</>
        )}

      </section>

      <Footer />
    </>
  );
}

export default PropertyListing;