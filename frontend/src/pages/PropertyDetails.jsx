import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleShare = async () => {
  try {
    await navigator.clipboard.writeText(
      window.location.href
    );

    alert(
      "Property link copied successfully!"
    );
  } catch (error) {
    console.error(error);
    alert("Unable to copy link.");
  }
};

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/properties/${id}`
        );

        const data = await response.json();

        if (data.success) {
          setProperty(data.property);
        
          await fetch(
              `http://localhost:5000/api/properties/${id}/view`,
              {
                method: "PUT",
              }
            );

          // Recently Viewed Properties
          const recentlyViewed =
            JSON.parse(
              localStorage.getItem("recentlyViewed")
            ) || [];

          const filteredProperties =
            recentlyViewed.filter(
              (item) =>
                item._id !== data.property._id
            );

          const updatedProperties = [
            data.property,
            ...filteredProperties,
          ].slice(0, 5);

          localStorage.setItem(
            "recentlyViewed",
            JSON.stringify(updatedProperties)
          );
        }
      } catch (error) {
        console.error(
          "Error fetching property:",
          error
        );
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

        <div className="h-96 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center">
          <div className="text-7xl">🏠</div>

          <p className="mt-4 text-gray-600 text-lg">
            Property Image Coming Soon
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              {property.title}
            </h1>

            <p className="text-gray-600 mt-2">
            📍 {property.locality}, {property.address}, {property.city}, {property.state}
          </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              ₹{" "}
              {property.price.toLocaleString()}
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Property Type
            </p>
            <h3 className="font-semibold">
              {property.propertyType}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Listing Type
            </p>
            <h3 className="font-semibold">
              {property.listingType}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Area
            </p>
            <h3 className="font-semibold">
              {property.area} sq.ft
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Furnishing
            </p>
            <h3 className="font-semibold">
              {property.furnishing}
            </h3>
          </div>

        </div>

        <div className="bg-white shadow rounded-2xl p-6 mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Description
          </h2>

          <p className="text-gray-700">
            {property.description ||
              "No description available."}
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Additional Details
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-500">
                Bedrooms
              </p>
              <p className="font-semibold">
                {property.bedrooms}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Bathrooms
              </p>
              <p className="font-semibold">
                {property.bathrooms}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Pincode
              </p>
              <p className="font-semibold">
                {property.pincode}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Locality
              </p>
              <p className="font-semibold">
                {property.locality}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Views
              </p>
              <p className="font-semibold">
                {property.views}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Status
              </p>
              <p className="font-semibold">
                {property.isActive
                  ? "Active"
                  : "Inactive"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Approval
              </p>
              <p className="font-semibold">
                {property.isApproved
                  ? "Approved"
                  : "Pending"}
              </p>
            </div>

          </div>

        </div>

        <div className="bg-white shadow rounded-2xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Owner Contact Details
          </h2>

          {user ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <p className="text-gray-500">
                    Owner Name
                  </p>
                  <p className="font-semibold text-lg">
                    {property.ownerName ||
                      "Not Available"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Phone Number
                  </p>
                  <p className="font-semibold text-lg">
                    {property.ownerPhone ||
                      "Not Available"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Email Address
                  </p>
                  <p className="font-semibold text-lg break-all">
                    {property.ownerEmail ||
                      "Not Available"}
                  </p>
                </div>

              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-8">

                <a
                  href={`tel:${property.ownerPhone}`}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-green-700 transition"
                >
                  📞 Call Owner
                </a>

                <a
                  href={`mailto:${property.ownerEmail}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition"
                >
                  ✉️ Email Owner
                </a>

              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-lg text-gray-600 mb-4">
                Login to view owner contact
                details
              </p>

            <button
  onClick={() => {
    window.location.href = "/";
  }}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
>
  Login
</button>
            </div>
          )}

        </div>

       {/* Similar Properties + Share */}
          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">

            <button
              onClick={() =>
                navigate(
                  `/properties?type=${property.propertyType}&listingType=${property.listingType}`
                )
              }
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              View Similar Properties
            </button>

            <button
              onClick={handleShare}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition"
            >
              🔗 Share Property
            </button>

          </div>

      </section>

      <Footer />
    </>
  );
}

export default PropertyDetails;