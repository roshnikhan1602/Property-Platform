import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const navigate = useNavigate();

  const fetchData = () => {
    fetch(
      "http://localhost:5000/api/admin/users"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        }
      });

    fetch(
      "http://localhost:5000/api/admin/properties"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProperties(data.properties);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pendingProperties =
    properties.filter(
      (property) => !property.isApproved
    );

  const approvedProperties =
    properties.filter(
      (property) => property.isApproved
    );

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/approve/${id}`,
        {
          method: "PUT",
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert("Property Approved");
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisapprove =
    async (id) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/disapprove/${id}`,
          {
            method: "PUT",
          }
        );

        const data =
          await response.json();

        if (data.success) {
          alert("Property Disapproved");
          fetchData();
        }
      } catch (error) {
        console.error(error);
      }
    };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this property?"
      );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/property/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert("Property Deleted");
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/user/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setSelectedUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/user/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("User Deleted");
        fetchData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div
            onClick={() =>
              setActiveTab("users")
            }
            className={`shadow-lg rounded-2xl p-8 cursor-pointer hover:shadow-xl ${activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-white"
              }`}
          >
            <h2
              className={
                activeTab === "users"
                  ? "text-white font-medium"
                  : "text-gray-500"
              }
            >
              Users
            </h2>

            <p
              className={`text-5xl font-bold mt-3 ${activeTab === "users"
                ? "text-white"
                : "text-blue-600"
                }`}
            >
              {users.length}
            </p>
          </div>

          <div
            onClick={() =>
              navigate("/properties")
            }
            className="bg-white shadow-lg rounded-2xl p-8 cursor-pointer hover:shadow-xl"
          >
            <h2 className="text-gray-500">
              Properties
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-3">
              {properties.length}
            </p>
          </div>

          <div
            onClick={() =>
              setActiveTab("pending")
            }
            className={`shadow-lg rounded-2xl p-8 cursor-pointer hover:shadow-xl ${activeTab === "pending"
              ? "bg-orange-500 text-white"
              : "bg-white"
              }`}
          >
            <h2
              className={
                activeTab === "pending"
                  ? "text-white font-medium"
                  : "text-gray-500"
              }
            >
              Pending
            </h2>

            <p
              className={`text-5xl font-bold mt-3 ${activeTab === "pending"
                ? "text-white"
                : "text-orange-500"
                }`}
            >
              {pendingProperties.length}
            </p>
          </div>

          <div
            onClick={() =>
              setActiveTab("approved")
            }
            className={`shadow-lg rounded-2xl p-8 cursor-pointer hover:shadow-xl ${activeTab === "approved"
              ? "bg-purple-600 text-white"
              : "bg-white"
              }`}
          >
            <h2
              className={
                activeTab === "approved"
                  ? "text-white font-medium"
                  : "text-gray-500"
              }
            >
              Approved
            </h2>

            <p
              className={`text-5xl font-bold mt-3 ${activeTab === "approved"
                ? "text-white"
                : "text-purple-600"
                }`}
            >
              {approvedProperties.length}
            </p>
          </div>

        </div>

        {activeTab === "users" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">
                All Users
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4">
                      User
                    </th>

                    <th className="text-left px-6 py-4">
                      Mobile
                    </th>

                    <th className="text-left px-6 py-4">
                      Role
                    </th>

                    <th className="text-left px-6 py-4">
                      Joined
                    </th>

                    <th className="text-center px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            {user.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold">
                              {user.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              {user.email ||
                                "No Email"}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {user.mobileNumber}
                      </td>

                      <td className="px-6 py-4">
                        <span className="capitalize px-3 py-1 rounded-full bg-gray-100 text-sm">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              handleViewUser(
                                user._id
                              )
                            }
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                          >
                            View
                          </button>

                          {user.role !==
                            "admin" && (
                              <button
                                onClick={() =>
                                  handleDeleteUser(
                                    user._id
                                  )
                                }
                                className="bg-red-600 text-white px-3 py-2 rounded-lg"
                              >
                                Delete
                              </button>
                            )}

                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            </div>

          </div>
        )}

        {activeTab === "pending" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">
                Pending Properties
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4">
                      Property
                    </th>

                    <th className="text-left px-6 py-4">
                      City
                    </th>

                    <th className="text-left px-6 py-4">
                      Price
                    </th>

                    <th className="text-center px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {pendingProperties.map(
                    (property) => (
                      <tr
                        key={property._id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-semibold">
                          {property.title}
                        </td>

                        <td className="px-6 py-4">
                          {property.city}
                        </td>

                        <td className="px-6 py-4">
                          ₹{property.price}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() =>
                                navigate(
                                  `/properties/${property._id}`
                                )
                              }
                              className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                            >
                              View
                            </button>

                            <button
                              onClick={() =>
                                handleApprove(
                                  property._id
                                )
                              }
                              className="bg-green-600 text-white px-3 py-2 rounded-lg"
                            >
                              Approve
                            </button>

                          </div>
                        </td>
                      </tr>
                    )
                  )}

                </tbody>

              </table>
            </div>

          </div>
        )}
        {activeTab === "approved" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">
                Approved Properties
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4">
                      Property
                    </th>

                    <th className="text-left px-6 py-4">
                      City
                    </th>

                    <th className="text-left px-6 py-4">
                      Views
                    </th>

                    <th className="text-center px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {approvedProperties.map(
                    (property) => (
                      <tr
                        key={property._id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-semibold">
                          {property.title}
                        </td>

                        <td className="px-6 py-4">
                          {property.city}
                        </td>

                        <td className="px-6 py-4">
                          {property.views || 0}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() =>
                                navigate(
                                  `/properties/${property._id}`
                                )
                              }
                              className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                            >
                              View
                            </button>

                            <button
                              onClick={() =>
                                handleDisapprove(
                                  property._id
                                )
                              }
                              className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                            >
                              Disapprove
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  property._id
                                )
                              }
                              className="bg-red-600 text-white px-3 py-2 rounded-lg"
                            >
                              Delete
                            </button>

                          </div>
                        </td>
                      </tr>
                    )
                  )}

                </tbody>

              </table>
            </div>

          </div>
        )}

      </section>
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-5">
              User Details
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {selectedUser.name}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {selectedUser.mobileNumber}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedUser.email ||
                "Not Provided"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {selectedUser.role}
            </p>

            <p>
              <strong>Joined:</strong>{" "}
              {new Date(
                selectedUser.createdAt
              ).toLocaleDateString()}
            </p>

            <button
              onClick={() =>
                setSelectedUser(null)
              }
              className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Close
            </button>

          </div>

        </div>
      )}
      <Footer />
    </>
  );
}

export default AdminDashboard;