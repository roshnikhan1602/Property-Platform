import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEye,
  FaPlus,
  FaTrash,
  FaEdit,
  FaExternalLinkAlt,
  FaHeart,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
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

  const [showInterestedModal, setShowInterestedModal] =
    useState(false);

  const [interestedUsers, setInterestedUsers] =
    useState([]);

  const [loadingInterestedUsers, setLoadingInterestedUsers] =
    useState(false);

  const navigate = useNavigate();

  const fetchMyProperties = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/properties/my-properties`,
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
        `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
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

        const pgResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/pgs/my-pgs`,
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
        `${import.meta.env.VITE_API_URL}/api/properties/${id}/toggle-status`,
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
          `Property ${data.property.isActive
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

  const fetchInterestedUsers = async (propertyId) => {
    try {
      setLoadingInterestedUsers(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/wishlist/property/${propertyId}/interested-users`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setInterestedUsers(data.users);
        setShowInterestedModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingInterestedUsers(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-8 sm:pb-10">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

          <h1 className="text-3xl sm:text-4xl font-bold">
            My Properties
          </h1>

          <Link
            to="/add-property"
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5 hover:shadow-lg transition"
              >

                <h2 className="text-xl font-bold text-gray-800 break-words">
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
                  <FaMapMarkerAlt className="text-red-500 shrink-0" />
                  <span className="break-words">
                    {property.city},{" "}
                    {property.state}
                  </span>
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

                  <p className="text-sm text-pink-600 mt-2 flex items-center gap-2 font-medium">
                    <FaHeart />
                    {property.interestedCount || 0} Interested
                  </p>

                </div>

                <button
                  onClick={() =>
                    fetchInterestedUsers(property._id)
                  }
                  className="w-full mb-4 bg-pink-100 text-pink-700 py-2 rounded-lg hover:bg-pink-200 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <FaUsers />
                  View Interested Users
                </button>

                <div className="grid grid-cols-2 gap-2 mt-5">

                  <button
                    onClick={() => {
                      if (property.isActive) {
                        setSelectedPropertyId(property._id);
                        setShowDeactivateModal(true);
                      } else {
                        handleToggleStatus(property._id);
                      }
                    }}
                    className={`py-2 rounded-lg text-sm transition cursor-pointer ${
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
                    className="bg-blue-600 text-white text-center py-2 rounded-lg text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt />
                    View
                  </Link>

                  <Link
                    to={`/edit-property/${property._id}`}
                    className="bg-gray-100 text-gray-700 text-center py-2 rounded-lg text-sm hover:bg-gray-200 transition flex items-center justify-center gap-2"
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
                    className="bg-red-100 text-red-600 py-2 rounded-lg text-sm hover:bg-red-200 transition flex items-center justify-center gap-2 cursor-pointer"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-md">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Delete Property
            </h2>

            <p className="text-gray-600 mt-3">
              Are you sure you want to delete this property?
              This action cannot be undone.
            </p>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPropertyId(null);
                }}
                className="w-full sm:w-auto px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleDelete(selectedPropertyId)
                }
                className="w-full sm:w-auto px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-md">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
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

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">

              <button
                onClick={() => {
                  setShowDeactivateModal(false);
                  setSelectedPropertyId(null);
                }}
                className="w-full sm:w-auto px-5 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleToggleStatus(selectedPropertyId);
                  setShowDeactivateModal(false);
                  setSelectedPropertyId(null);
                }}
                className="w-full sm:w-auto px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Deactivate
              </button>

            </div>

          </div>
        </div>
      )}

      {showInterestedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3 sm:px-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">

            <div className="flex justify-between items-center mb-6 gap-3">

              <h2 className="text-xl sm:text-2xl font-bold">
                Interested Users
              </h2>

              <button
                onClick={() =>
                  setShowInterestedModal(false)
                }
                className="text-gray-500 hover:text-black text-2xl shrink-0"
              >
                ×
              </button>

            </div>

            {loadingInterestedUsers ? (
              <p className="text-center py-10">
                Loading...
              </p>
            ) : interestedUsers.length === 0 ? (
              <div className="text-center py-10">

                <FaHeart className="mx-auto text-4xl text-pink-400 mb-3" />

                <p className="text-gray-500">
                  No users have wishlisted this property yet.
                </p>

              </div>
            ) : (
              <div className="space-y-4">

                {interestedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="border rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition"
                  >

                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">

                      <img
                        src={
                          user.profileImage ||
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(user.name)
                        }
                        alt={user.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border shrink-0"
                      />

                      <div className="flex-1 min-w-0">

                        <h3 className="text-base sm:text-lg font-semibold break-words">
                          {user.name}
                        </h3>

                        <p className="flex items-start gap-2 text-gray-600 mt-1 break-all">
                          <FaPhone className="mt-1 shrink-0" />
                          {user.mobileNumber}
                        </p>

                        {user.email && (
                          <p className="flex items-start gap-2 text-gray-600 mt-1 break-all">
                            <FaEnvelope className="mt-1 shrink-0" />
                            {user.email}
                          </p>
                        )}

                        <p className="flex items-start gap-2 text-gray-500 text-sm mt-2">
                          <FaCalendarAlt className="mt-0.5 shrink-0" />
                          <span>
                            Wishlisted on{" "}
                            {new Date(
                              user.wishlistedAt
                            ).toLocaleDateString()}
                          </span>
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default MyProperties;