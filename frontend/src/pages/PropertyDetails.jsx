import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/properties/${id}`
        );

        const data = await response.json();

        if (data.success) {
          setProperty(data.property);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-600">
            Loading property details...
          </h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-600">
            Property not found.
          </h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">

        {/* Image Placeholder */}
        <div className="h-96 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center">
          <div className="text-7xl">🏠</div>

          <p className="mt-4 text-gray-600 text-lg">
            Property Image Coming Soon
          </p>
        </div>

        {/* Property Header */}
        <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              {property.title}
            </h1>

            <p className="text-gray-600 mt-2">
              📍 {property.address}, {property.city}, {property.state}
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              ₹ {property.price.toLocaleString()}
            </h2>
          </div>

        </div>

        {/* Property Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Property Type</p>
            <h3 className="font-semibold">
              {property.propertyType}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Listing Type</p>
            <h3 className="font-semibold">
              {property.listingType}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Area</p>
            <h3 className="font-semibold">
              {property.area} sq.ft
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Furnishing</p>
            <h3 className="font-semibold">
              {property.furnishing}
            </h3>
          </div>

        </div>

        {/* Description */}
        <div className="bg-white shadow rounded-2xl p-6 mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Description
          </h2>

          <p className="text-gray-700">
            {property.description}
          </p>
        </div>

        {/* Additional Details */}
        <div className="bg-white shadow rounded-2xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Additional Details
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-500">Bedrooms</p>
              <p className="font-semibold">
                {property.bedrooms}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Bathrooms</p>
              <p className="font-semibold">
                {property.bathrooms}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Pincode</p>
              <p className="font-semibold">
                {property.pincode}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Views</p>
              <p className="font-semibold">
                {property.views}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-semibold">
                {property.isActive ? "Active" : "Inactive"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Approval</p>
              <p className="font-semibold">
                {property.isApproved ? "Approved" : "Pending"}
              </p>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default PropertyDetails;