import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEye,
  FaPlus,
  FaTrash,
  FaEdit,
  FaExternalLinkAlt,
} from "react-icons/fa";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedPropertyId, setSelectedPropertyId] =
    useState(null);

  const [showDeactivateModal, setShowDeactivateModal] =
  useState(false);

const [deactivationReason, setDeactivationReason] =
  useState("Property Sold");

  const navigate = useNavigate();

 

  const fetchMyProperties = async () => {
    try {
    const response = await fetch(
  "http://localhost:5000/api/properties/my-properties",
  {
    credentials: "include",
  }
);

      const data = await response.json();

      if (data.success) {
        setProperties(data.properties);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Failed to load properties"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchMyProperties();
}, []);

  const handleDelete = async (id) => {
    setShowDeleteModal(false);

    try {
      const response = await fetch(
  `http://localhost:5000/api/properties/${id}`,
  {
    method: "DELETE",
    credentials: "include",
  }
);


      const data = await response.json();

      if (data.success) {
        const updatedProperties =
          properties.filter(
            (property) =>
              property._id !== id
          );

        setProperties(updatedProperties);
        setSelectedPropertyId(null);
        setShowDeleteModal(false);

        setSuccessMessage(
          "Property deleted successfully"
        );

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        

        // Fetch remaining PGs
        const pgResponse = await fetch(
  "http://localhost:5000/api/pgs/my-pgs",
  {
    credentials: "include",
  }
);

        const pgData =
          await pgResponse.json();

        const totalPGs =
          pgData.success
            ? pgData.pgs.length
            : 0;

        // Downgrade owner only when BOTH properties and PGs are zero
       if (
  updatedProperties.length === 0 &&
  totalPGs === 0
) {
  setTimeout(() => {
    navigate("/user-dashboard");
    window.location.reload();
  }, 1000);
}
      }
    } catch (error) {
      console.error(error);

      setShowDeleteModal(false);
      setSelectedPropertyId(null);
      setErrorMessage(
        "Failed to delete property"
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  const handleToggleStatus = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/properties/${id}/toggle-status`,
      {
        method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            deactivationReason,
          }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setProperties((prev) =>
        prev.map((property) =>
          property._id === id
            ? data.property
            : property
        )
      );

      setSuccessMessage(
        `Property ${
          data.property.isActive
            ? "Activated"
            : "Deactivated"
        } Successfully`
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  } catch (error) {
    console.error(error);

    setErrorMessage(
      "Failed to update property status."
    );

    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
};

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-10">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            My Properties
          </h1>

          <Link
            to="/add-property"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
          >
            <FaPlus />
            Add Property
          </Link>

        </div>

        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            {errorMessage}
          </div>
        )}

        {loading ? (
          <h2 className="text-center text-gray-500">
            Loading...
          </h2>
        ) : properties.length === 0 ? (
          <div className="text-center py-16">

            <h2 className="text-2xl font-semibold text-gray-700">
              No Properties Found
            </h2>

            <p className="text-gray-500 mt-2">
              Start by adding your first
              property.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition"
              >

                <h2 className="text-xl font-bold text-gray-800">
                  {property.title}
                </h2>

                <div className="mt-3">
                  {property.isActive ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      🟢 Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      🔴 Inactive
                    </span>
                  )}
                </div>

                <p className="text-gray-500 mt-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  {property.city},{" "}
                  {property.state}
                </p>

                <div className="mt-4">

                  <p className="text-blue-600 font-bold text-2xl">
                    ₹{" "}
                    {property.price.toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <FaEye />
                    {property.views || 0} Views
                  </p>

                </div>

                <div className="flex gap-2 mt-5">

                  <button
                      onClick={() => {
                        if (property.isActive) {
                          setSelectedPropertyId(property._id);
                          setShowDeactivateModal(true);
                        } else {
                          handleToggleStatus(property._id);
                        }
                      }}
                      className={`flex-1 py-2 rounded-lg text-sm transition cursor-pointer ${
                        property.isActive
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {property.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                  <Link
                    to={`/properties/${property._id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt />
                    View
                  </Link>

                  <Link
                    to={`/edit-property/${property._id}`}
                    className="flex-1 bg-gray-100 text-gray-700 text-center py-2 rounded-lg text-sm hover:bg-gray-200 transition flex items-center justify-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedPropertyId(
                        property._id
                      );
                      setShowDeleteModal(true);
                    }}
                    className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg text-sm hover:bg-red-200 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">

            <h2 className="text-2xl font-bold text-gray-800">
              Delete Property
            </h2>

            <p className="text-gray-600 mt-3">
              Are you sure you want to delete this property?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPropertyId(null);
                }}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleDelete(selectedPropertyId)
                }
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

      {showDeactivateModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">

      <h2 className="text-2xl font-bold text-gray-800">
        Deactivate Property
      </h2>

      <p className="text-gray-600 mt-2">
        Please tell us why you're deactivating this property.
      </p>

      <select
        value={deactivationReason}
        onChange={(e) =>
          setDeactivationReason(e.target.value)
        }
        className="w-full mt-5 border rounded-lg p-3"
      >
        <option>Property Sold</option>
        <option>Property Rented</option>
        <option>Temporarily Unavailable</option>
        <option>Under Renovation</option>
        <option>Owner Not Interested</option>
        <option>Other</option>
      </select>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => {
            setShowDeactivateModal(false);
            setSelectedPropertyId(null);
          }}
          className="px-5 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            handleToggleStatus(selectedPropertyId);
            setShowDeactivateModal(false);
            setSelectedPropertyId(null);
          }}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Deactivate
        </button>

      </div>

    </div>
  </div>
)}
      <Footer />
    </>
  );
}

export default MyProperties;