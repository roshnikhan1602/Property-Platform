import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEye,
  FaPlus,
  FaTrash,
  FaEdit,
  FaExternalLinkAlt,
  FaBed,
} from "react-icons/fa";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MyPGs() {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedPGId, setSelectedPGId] =
    useState(null);

  const [interestedUsers, setInterestedUsers] = useState([]);
  const [showInterestedModal, setShowInterestedModal] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [statusLoading, setStatusLoading] = useState(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState("");
  const [selectedDeactivatePG, setSelectedDeactivatePG] = useState(null);

  const fetchMyPGs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/pgs/my-pgs",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {

        setPgs(data.pgs);
      }
    } catch (error) {
      console.error(error);
      setSelectedPGId(null);
      setErrorMessage(
        "Failed to load PGs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPGs();
  }, []);

  const fetchInterestedUsers = async (pgId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/pg/${pgId}/interested-users`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setInterestedUsers(data.users);
        setWishlistCount(data.count);
        setShowInterestedModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePGStatus = async (pgId) => {
    const pg = pgs.find((item) => item._id === pgId);

    // If active, open reason modal
    if (pg.isActive) {
      setSelectedDeactivatePG(pgId);
      setShowDeactivateModal(true);
      return;
    }

    // If inactive, activate immediately
    try {
      setStatusLoading(pgId);

      const response = await fetch(
        `http://localhost:5000/api/pgs/${pgId}/status`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchMyPGs();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStatusLoading(null);
    }
  };

  const handleDeactivatePG = async () => {
    try {
      setStatusLoading(selectedDeactivatePG);

      const response = await fetch(
        `http://localhost:5000/api/pgs/${selectedDeactivatePG}/status`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: deactivationReason,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setShowDeactivateModal(false);
        setSelectedDeactivatePG(null);
        setDeactivationReason("");
        fetchMyPGs();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStatusLoading(null);
    }
  };

  const handleDelete = async (id) => {
    setShowDeleteModal(false);
    try {
      const response = await fetch(
        `http://localhost:5000/api/pgs/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );


      const data = await response.json();

      if (data.success) {
        const updatedPGs = pgs.filter(
          (pg) => pg._id !== id
        );

        setPgs(updatedPGs);
        setSelectedPGId(null);
        setShowDeleteModal(false);
        setSuccessMessage(
          "PG deleted successfully"
        );

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        // Check remaining properties
        const propertyResponse = await fetch(
          "http://localhost:5000/api/properties/my-properties",
          {
            credentials: "include",
          }
        );

        const propertyData =
          await propertyResponse.json();

        const totalProperties =
          propertyData.success
            ? propertyData.properties.length
            : 0;

        // Downgrade only if NO PGs and NO Properties
        if (
          updatedPGs.length === 0 &&
          totalProperties === 0
        ) {
          setTimeout(() => {
            window.location.href = "/user-dashboard";
          }, 1000);
        }
      }
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Failed to delete PG"
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
            My PGs
          </h1>

          <Link
            to="/add-pg"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
          >
            <FaPlus />
            Add PG
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
        ) : pgs.length === 0 ? (
          <div className="text-center py-16">

            <h2 className="text-2xl font-semibold text-gray-700">
              No PGs Found
            </h2>

            <p className="text-gray-500 mt-2">
              Start by adding your first PG.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {pgs.map((pg) => (
              <div
                key={pg._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition"
              >

                <div className="h-52 rounded-xl overflow-hidden mb-4">

                  {pg.images && pg.images.length > 0 ? (
                    <img
                      src={pg.images[0]}
                      alt={pg.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <FaBed className="text-5xl text-blue-600" />
                    </div>
                  )}

                </div>

                <h2 className="text-xl font-bold text-gray-800">
                  {pg.title}
                </h2>

                <p className="text-gray-500 mt-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  {pg.city}, {pg.state}
                </p>

                <div className="mt-4">

                  <p className="text-green-600 font-bold text-2xl">
                    ₹ {pg.rent?.toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Deposit: ₹{" "}
                    {pg.depositAmount?.toLocaleString() || 0}
                  </p>

                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <FaEye />
                    {pg.views || 0} Views
                  </p>
                  <p className="text-sm text-pink-600 mt-2">
                    ❤️ {pg.wishlistCount || 0} Users Wishlisted
                  </p>

                </div>

                {/* Interested Users Button */}
                <button
                  onClick={() => fetchInterestedUsers(pg._id)}
                  className="w-full mt-4 mb-4 bg-pink-100 text-pink-700 py-3 rounded-xl hover:bg-pink-200 transition flex items-center justify-center gap-2 font-medium"
                >
                  👥 View Interested Users
                </button>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">

                  <Link
                    to={`/pgs/${pg._id}`}
                    className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt />
                    View
                  </Link>

                  <Link
                    to={`/edit-pg/${pg._id}`}
                    className="bg-yellow-100 text-yellow-700 py-3 rounded-xl hover:bg-yellow-200 transition flex items-center justify-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </Link>

                  <button
                    onClick={() => {
                      if (pg.isActive) {
                        setSelectedDeactivatePG(pg._id);
                        setShowDeactivateModal(true);
                      } else {
                        togglePGStatus(pg._id);
                      }
                    }}
                    disabled={statusLoading === pg._id}
                    className={`py-3 rounded-xl transition flex items-center justify-center gap-2 font-medium ${pg.isActive
                      ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                  >
                    {statusLoading === pg._id
                      ? "Updating..."
                      : pg.isActive
                        ? "Deactivate"
                        : "Activate"}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPGId(pg._id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-100 text-red-600 py-3 rounded-xl hover:bg-red-200 transition flex items-center justify-center gap-2 cursor-pointer"
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

      <Footer />
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-lg">
            <h2 className="text-2xl font-bold mb-3">
              Deactivate PG
            </h2>

            <p className="text-gray-600 mb-4">
              Please provide a reason. This will be shown only to users who have
              wishlisted this PG.
            </p>

            <textarea
              rows={4}
              value={deactivationReason}
              onChange={(e) =>
                setDeactivationReason(e.target.value)
              }
              placeholder="Example: PG is fully occupied, Renovation work, Temporarily unavailable..."
              className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeactivateModal(false);
                  setSelectedDeactivatePG(null);
                  setDeactivationReason("");
                }}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeactivatePG}
                disabled={!deactivationReason.trim()}
                className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">

            <h2 className="text-2xl font-bold text-gray-800">
              Delete PG
            </h2>

            <p className="text-gray-600 mt-3">
              Are you sure you want to delete this PG?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPGId(null);
                }}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleDelete(selectedPGId)
                }
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}
      {showInterestedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-2xl p-6 max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                Interested Users ({wishlistCount})
              </h2>

              <button
                onClick={() => setShowInterestedModal(false)}
                className="text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {interestedUsers.length === 0 ? (
              <p className="text-gray-500">
                No users have wishlisted this PG yet.
              </p>
            ) : (
              <div className="space-y-4">
                {interestedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="border rounded-xl p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">

                      <img
                        src={
                          user.profileImage ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                        }
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-600">
                          {user.email}
                        </p>

                        <p className="text-sm text-gray-600">
                          {user.mobileNumber}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Wishlisted on{" "}
                          {new Date(user.wishlistedAt).toLocaleDateString()}
                        </p>
                      </div>

                    </div>

                    <a
                      href={`tel:${user.mobileNumber}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Contact
                    </a>

                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}

export default MyPGs;