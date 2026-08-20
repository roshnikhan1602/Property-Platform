import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";

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
  const [wishlistIds, setWishlistIds] =
    useState([]);

  const [searchParams, setSearchParams] =
    useSearchParams();

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
          params.append(
            "propertyType",
            propertyType
          );

        if (listingType)
          params.append(
            "listingType",
            listingType
          );

        if (minPrice)
          params.append("minPrice", minPrice);

        if (maxPrice)
          params.append("maxPrice", maxPrice);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/properties?${params.toString()}`
        );

        const data = await response.json();

        if (data.success) {
          setProperties(data.properties);
          setTotalProperties(
            data.totalProperties
          );
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

    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/wishlist`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        if (data.success) {
          setWishlistIds(
            data.wishlist.map(
              (item) => item.itemId?._id
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
    fetchWishlist();
  }, [
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* ================= BACK BUTTON ================= */}
        <div className="mb-5 sm:mb-6">
          <BackButton />
        </div>

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            All Properties
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Browse available properties.
          </p>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="w-full">
          <PropertyFilterBar />
        </div>

        {/* ================= ACTIVE FILTERS ================= */}
        {(city ||
          locality ||
          propertyType ||
          listingType ||
          minPrice ||
          maxPrice) && (
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">

            {city && (
              <span className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap">
                📍 {city}
              </span>
            )}

            {locality && (
              <span className="bg-orange-100 text-orange-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap">
                🏘️ {locality}
              </span>
            )}

            {propertyType && (
              <span className="bg-green-100 text-green-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap">
                🏠 {propertyType}
              </span>
            )}

            {listingType && (
              <span className="bg-purple-100 text-purple-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap">
                📋 {listingType}
              </span>
            )}

            {(minPrice || maxPrice) && (
              <span className="bg-yellow-100 text-yellow-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap">
                💰 Price Filter Applied
              </span>
            )}

            <button
              onClick={() => setSearchParams({})}
              className="bg-red-100 text-red-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-red-200 transition whitespace-nowrap"
            >
              Clear Filters
            </button>

          </div>
        )}

        {/* ================= CONTENT ================= */}
        {loading ? (
          <div className="mt-10 sm:mt-14 text-center py-10">
            <p className="text-sm sm:text-base text-gray-500">
              Loading properties...
            </p>
          </div>
        ) : properties.length === 0 ? (
          <div className="mt-12 sm:mt-16 text-center px-4">

            <div className="text-5xl sm:text-6xl mb-4">
              🔍
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
              No Properties Found
            </h2>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Try changing your filters.
            </p>

          </div>
        ) : (
          <>
            {/* ================= RESULT COUNT ================= */}
            <div className="mt-6 sm:mt-8">
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                Showing {properties.length} of{" "}
                {totalProperties} Properties
              </p>
            </div>

            {/* ================= PROPERTY GRID ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-5 sm:mt-6">

              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  wishlistIds={wishlistIds}
                />
              ))}

            </div>

            {/* ================= PAGINATION ================= */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-10">

              <button
                disabled={page === 1}
                onClick={() => {
                  const params =
                    new URLSearchParams(
                      searchParams
                    );

                  params.set(
                    "page",
                    page - 1
                  );

                  setSearchParams(params);
                }}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer hover:bg-gray-300 transition"
              >
                Previous
              </button>

              <span className="font-medium text-sm sm:text-base px-2">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={
                  page === totalPages
                }
                onClick={() => {
                  const params =
                    new URLSearchParams(
                      searchParams
                    );

                  params.set(
                    "page",
                    page + 1
                  );

                  setSearchParams(params);
                }}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer hover:bg-blue-700 transition"
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