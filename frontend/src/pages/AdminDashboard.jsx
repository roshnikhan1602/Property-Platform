import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";


function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const [properties, setProperties] =
    useState([]);

  const [supportMessages, setSupportMessages] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [replyText, setReplyText] =
    useState("");

  const [selectedMessageId, setSelectedMessageId] =
    useState(null);

  const [showReplyModal, setShowReplyModal] =
    useState(false);

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

    fetch(
      "http://localhost:5000/api/support"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSupportMessages(
            data.messages
          );
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
        setToast({
          show: true,
          message: "Property approved successfully",
          type: "success",
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message: "Failed to approve property",
        type: "error",
      });
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
          setToast({
            show: true,
            message: "Property disapproved successfully",
            type: "success",
          });
          fetchData();
        }
      } catch (error) {
        console.error(error);
        setToast({
          show: true,
          message: "Failed to disapprove property",
          type: "error",
        });
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
        setToast({
          show: true,
          message: "Property deleted successfully",
          type: "success",
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message: "Failed to delete property",
        type: "error",
      });
    }
  };

  const handleResolve = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/support/resolve/${id}`,
        {
          method: "PUT",
        }
      );

      const data =
        await response.json();

      if (data.success) {
        fetchData();

        setToast({
          show: true,
          message:
            "Ticket resolved",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/support/reply/${selectedMessageId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            reply: replyText,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        fetchData();

        setShowReplyModal(false);

        setReplyText("");

        setToast({
          show: true,
          message:
            "Reply sent successfully",
          type: "success",
        });
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
      setToast({
        show: true,
        message: "Failed to load user details",
        type: "error",
      });
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
        setToast({
          show: true,
          message: "User deleted successfully",
          type: "success",
        });
        fetchData();
      } else {
        setToast({
          show: true,
          message: data.message,
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message: "Failed to delete user",
        type: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              show: false,
              message: "",
              type: "success",
            })
          }
        />
      )}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-10">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-5 gap-6 mb-10">

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

          <div
            onClick={() =>
              setActiveTab("support")
            }
            className={`shadow-lg rounded-2xl p-8 cursor-pointer hover:shadow-xl ${activeTab === "support"
              ? "bg-red-600 text-white"
              : "bg-white"
              }`}
          >
            <h2
              className={
                activeTab === "support"
                  ? "text-white font-medium"
                  : "text-gray-500"
              }
            >
              Support
            </h2>

            <p
              className={`text-5xl font-bold mt-3 ${activeTab === "support"
                ? "text-white"
                : "text-red-600"
                }`}
            >
              {supportMessages.length}
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

        {activeTab === "support" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">
                Support Messages
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4">
                      Name
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Message
                    </th>
                    <th className="text-left px-6 py-4">
                      Date
                    </th>
                    <th className="text-left px-6 py-4">
                      Status
                    </th>
                    <th className="text-left px-6 py-4">
                      Reply
                    </th>

                    <th className="text-left px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {supportMessages.map(
                    (item) => (
                      <tr
                        key={item._id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium">
                          {item.name}
                        </td>

                        <td className="px-6 py-4">
                          {item.email}
                        </td>

                        <td className="px-6 py-4 max-w-md">
                          {item.message}
                        </td>

                        <td className="px-6 py-4">
                          {new Date(
                            item.createdAt
                          ).toLocaleString()}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "Replied"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                              }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {item.reply || "-"}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2">

                            <button
                              disabled={
                                item.status === "Replied" ||
                                item.status === "Resolved"
                              }
                              onClick={() => {
                                setSelectedMessageId(item._id);
                                setShowReplyModal(true);
                              }}
                              className="bg-blue-600 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Reply
                            </button>
                            <button
                              disabled={
                                item.status === "Resolved"
                              }
                              onClick={() =>
                                handleResolve(item._id)
                              }
                             className="bg-green-600 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Resolve
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
      {showReplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">
              Reply to {supportMessages.find(
                (msg) => msg._id === selectedMessageId
              )?.name}
            </h2>

            <textarea
              rows="5"
              value={replyText}
              onChange={(e) =>
                setReplyText(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
              placeholder="Type your reply..."
            />

            <div className="flex gap-3 mt-4">

              <button
                onClick={handleReply}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Send Reply
              </button>

              <button
                onClick={() =>
                  setShowReplyModal(
                    false
                  )
                }
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}
      <Footer />
    </>
  );
}

export default AdminDashboard;