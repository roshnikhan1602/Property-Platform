import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";
import ConfirmModal from "../components/common/ConfirmModal";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const [properties, setProperties] =
    useState([]);

  const [pgs, setPgs] =
    useState([]);

  const [supportMessages, setSupportMessages] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("");
  const [propertyView, setPropertyView] =
    useState("properties");

  const [pendingView, setPendingView] =
    useState("properties");

  const [approvedView, setApprovedView] =
    useState("properties");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
 
  const [confirmModal, setConfirmModal] =
  useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [replyText, setReplyText] =
    useState("");

  const [selectedMessageId, setSelectedMessageId] =
    useState(null);

  const [showReplyModal, setShowReplyModal] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = () => {
    fetch("http://localhost:5000/api/admin/users", {
  credentials: "include",
})
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        }
      });
fetch("http://localhost:5000/api/admin/properties", {
  credentials: "include",
})
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProperties(data.properties);
        }
      });
    fetch("http://localhost:5000/api/admin/pgs", {
  credentials: "include",
})
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPgs(data.pgs);
        }
      });
    fetch("http://localhost:5000/api/support", {
  credentials: "include",
})
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

  if (location.state?.fromAdmin) {
    setActiveTab(
      location.state.activeTab || ""
    );

    if (location.state.propertyView) {
      setPropertyView(
        location.state.propertyView
      );
    }

    if (location.state.pendingView) {
      setPendingView(
        location.state.pendingView
      );
    }

    if (location.state.approvedView) {
      setApprovedView(
        location.state.approvedView
      );
    }
  }
}, []);

  const pendingProperties =
    properties.filter(
      (property) => !property.isApproved
    );

  const approvedProperties =
    properties.filter(
      (property) => property.isApproved
    );

  const pendingPGs =
    pgs.filter((pg) => !pg.isApproved);

  const approvedPGs =
    pgs.filter((pg) => pg.isApproved);
  const ROWS_PER_PAGE = 10;

  const [propertyPage, setPropertyPage] =
    useState(1);

    const [pendingPage, setPendingPage] =
  useState(1);
  const [approvedPage, setApprovedPage] =
  useState(1);
  const [supportPage, setSupportPage] =
  useState(1);
  const [userPage, setUserPage] =
  useState(1);
  const propertyData =
    propertyView === "properties"
      ? properties
      : pgs;

  const propertyTotalPages =
    Math.ceil(
      propertyData.length /
      ROWS_PER_PAGE
    ) || 1;

  const paginatedProperties =
  propertyData.slice(
    (propertyPage - 1) *
      ROWS_PER_PAGE,
    propertyPage *
      ROWS_PER_PAGE
  );
const pendingData =
  pendingView === "properties"
    ? pendingProperties
    : pendingPGs;

const pendingTotalPages =
  Math.ceil(
    pendingData.length /
      ROWS_PER_PAGE
  ) || 1;

const paginatedPending =
  pendingData.slice(
    (pendingPage - 1) *
      ROWS_PER_PAGE,
    pendingPage *
      ROWS_PER_PAGE
  );
  const approvedData =
  approvedView === "properties"
    ? approvedProperties
    : approvedPGs;

const approvedTotalPages =
  Math.ceil(
    approvedData.length /
      ROWS_PER_PAGE
  ) || 1;

const paginatedApproved =
  approvedData.slice(
    (approvedPage - 1) *
      ROWS_PER_PAGE,
    approvedPage *
      ROWS_PER_PAGE
  );

  const supportTotalPages =
  Math.ceil(
    supportMessages.length /
      ROWS_PER_PAGE
  ) || 1;

const paginatedSupport =
  supportMessages.slice(
    (supportPage - 1) *
      ROWS_PER_PAGE,
    supportPage *
      ROWS_PER_PAGE
  );

  const userTotalPages =
  Math.ceil(
    users.length /
      ROWS_PER_PAGE
  ) || 1;

const paginatedUsers =
  users.slice(
    (userPage - 1) *
      ROWS_PER_PAGE,
    userPage *
      ROWS_PER_PAGE
  );
useEffect(() => {
  setPropertyPage(1);
}, [propertyView]);

useEffect(() => {
  setPendingPage(1);
}, [pendingView]);

useEffect(() => {
  setApprovedPage(1);
}, [approvedView]);

useEffect(() => {
  setSupportPage(1);
}, []);

useEffect(() => {
  setUserPage(1);
}, []);
useEffect(() => {
  setUserPage(1);
  setPropertyPage(1);
  setPendingPage(1);
  setApprovedPage(1);
  setSupportPage(1);
}, [activeTab]);
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/approve/${id}`, {
  method: "PUT",
  credentials: "include",
})

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
        const response = await fetch(`http://localhost:5000/api/admin/disapprove/${id}`, {
  method: "PUT",
  credentials: "include",
})

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
  setConfirmModal({
    show: true,
    title: "Delete Property",
    message:
      "Are you sure you want to delete this property? This action cannot be undone.",
    onConfirm: async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/property/${id}`, {
  method: "DELETE",
  credentials: "include",
})

        const data = await response.json();

        if (data.success) {
          setToast({
            show: true,
            message:
              "Property deleted successfully",
            type: "success",
          });

          fetchData();
        }
      } catch (error) {
        console.error(error);

        setToast({
          show: true,
          message:
            "Failed to delete property",
          type: "error",
        });
      } finally {
        setConfirmModal({
          show: false,
          title: "",
          message: "",
          onConfirm: null,
        });
      }
    },
  });
};
  const handleApprovePG = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/pg/approve/${id}`, {
  method: "PUT",
  credentials: "include",
})

      const data = await response.json();

      if (data.success) {
        setToast({
          show: true,
          message: "PG approved successfully",
          type: "success",
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisapprovePG = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/pg/disapprove/${id}`, {
  method: "PUT",
  credentials: "include",
})

      const data = await response.json();

      if (data.success) {
        setToast({
          show: true,
          message: "PG disapproved successfully",
          type: "success",
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePG = async (id) => {
  setConfirmModal({
    show: true,
    title: "Delete PG",
    message:
      "Are you sure you want to delete this PG? This action cannot be undone.",
    onConfirm: async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/pg/${id}`, {
  method: "DELETE",
  credentials: "include",
})

        const data = await response.json();

        if (data.success) {
          setToast({
            show: true,
            message: "PG deleted successfully",
            type: "success",
          });

          fetchData();
        }
      } catch (error) {
        console.error(error);

        setToast({
          show: true,
          message: "Failed to delete PG",
          type: "error",
        });
      } finally {
        setConfirmModal({
          show: false,
          title: "",
          message: "",
          onConfirm: null,
        });
      }
    },
  });
};
  const handleResolve = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/support/resolve/${id}`, {
  method: "PUT",
  credentials: "include",
})

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
      const response = await fetch(`http://localhost:5000/api/support/reply/${selectedMessageId}`, {
  method: "PUT",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    reply: replyText,
  }),
})

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
      const response = await fetch(`http://localhost:5000/api/admin/user/${id}`, {
  credentials: "include",
})

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
  setConfirmModal({
    show: true,
    title: "Delete User",
    message:
      "Are you sure you want to delete this user? This action cannot be undone.",
    onConfirm: async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/user/${id}`, {
  method: "DELETE",
  credentials: "include",
})

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
      } finally {
        setConfirmModal({
          show: false,
          title: "",
          message: "",
          onConfirm: null,
        });
      }
    },
  });
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
              setActiveTab("properties")
            }
            className={`shadow-lg rounded-2xl p-8 cursor-pointer hover:shadow-xl ${activeTab === "properties"
                ? "bg-green-600 text-white"
                : "bg-white"
              }`}
          >
            <h2
              className={
                activeTab === "properties"
                  ? "text-white font-medium"
                  : "text-gray-500"
              }
            >
              Properties
            </h2>

            <p
              className={`text-5xl font-bold mt-3 ${activeTab === "properties"
                  ? "text-white"
                  : "text-green-600"
                }`}
            >
             {properties.length + pgs.length}
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
              {pendingProperties.length + pendingPGs.length}
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
              {approvedProperties.length + approvedPGs.length}
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

<th className="text-center px-6 py-4">
  Properties
</th>

<th className="text-center px-6 py-4">
  PGs
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

                  {paginatedUsers.map((user) => (
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

<td className="px-6 py-4 text-center">
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
    {user.propertyCount}
  </span>
</td>

<td className="px-6 py-4 text-center">
  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
    {user.pgCount}
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

            <div className="flex justify-center items-center gap-3 mt-6 mb-6">

              <button
                disabled={userPage === 1}
                onClick={() =>
                  setUserPage(userPage - 1)
                }
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <span className="font-medium">
                Page {userPage} of {userTotalPages}
              </span>

              <button
                disabled={
                  userPage === userTotalPages
                }
                onClick={() =>
                  setUserPage(userPage + 1)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>

            </div>

          </div>
        )}




        {activeTab === "properties" && (
          <>
            <div className="flex gap-3 mb-5">
              <button
                onClick={() =>
                  setPropertyView("properties")
                }
                className={`px-5 py-2 rounded-lg font-medium ${propertyView === "properties"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                  }`}
              >
                Properties
              </button>

              <button
                onClick={() =>
                  setPropertyView("pgs")
                }
                className={`px-5 py-2 rounded-lg font-medium ${propertyView === "pgs"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                  }`}
              >
                PGs
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">
                  {propertyView === "properties"
                    ? "All Properties"
                    : "All PGs"}
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">

                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-4">
                        {propertyView === "properties"
                          ? "Property"
                          : "PG"}
                      </th>

                      <th className="text-left px-6 py-4">
                        City
                      </th>

                      <th className="text-left px-6 py-4">
                        {propertyView === "properties"
                          ? "Price"
                          : "Rent"}
                      </th>

                      <th className="text-center px-6 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      paginatedProperties.map((item) => (
                        <tr
                          key={item._id}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-semibold">
                            {item.title}
                          </td>

                          <td className="px-6 py-4">
                            {item.city}
                          </td>

                          <td className="px-6 py-4">
                            ₹
                            {propertyView ===
                              "properties"
                              ? item.price
                              : item.rent}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">

                              <button
                                onClick={() =>
                                navigate(
  propertyView === "properties"
    ? `/properties/${item._id}`
    : `/pgs/${item._id}`,
  {
    state: {
      fromAdmin: true,
      activeTab,
      propertyView,
      page: propertyPage,
    },
  }
)
                                }
                                className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                              >
                                View
                              </button>

                              <button
                                onClick={() =>
                                  propertyView === "properties"
                                    ? handleDelete(item._id)
                                    : handleDeletePG(item._id)
                                }
                                className="bg-red-600 text-white px-3 py-2 rounded-lg"
                              >
                                Delete
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}

                  </tbody>

                </table>
              </div>
              <div className="flex justify-center items-center gap-3 mt-6">

                <button
                  disabled={propertyPage === 1}
                  onClick={() =>
                    setPropertyPage(
                      propertyPage - 1
                    )
                  }
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="font-medium">
  Page {propertyPage} of {propertyTotalPages}
</span>

                <button
                 disabled={
  propertyPage === propertyTotalPages
}
                  onClick={() =>
                    setPropertyPage(
                      propertyPage + 1
                    )
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  Next
                </button>

              </div>
            </div>


          </>
        )}
        {activeTab === "pending" && (
         <>
  <div className="flex gap-3 mb-5">

    <button
      onClick={() =>
        setPendingView("properties")
      }
      className={`px-5 py-2 rounded-lg font-medium ${
        pendingView === "properties"
          ? "bg-orange-500 text-white"
          : "bg-gray-200"
      }`}
    >
      Properties
    </button>

    <button
      onClick={() =>
        setPendingView("pgs")
      }
      className={`px-5 py-2 rounded-lg font-medium ${
        pendingView === "pgs"
          ? "bg-orange-500 text-white"
          : "bg-gray-200"
      }`}
    >
      PGs
    </button>

  </div>

  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">
  {pendingView === "properties"
    ? "Pending Properties"
    : "Pending PGs"}
</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4">
  {pendingView === "properties"
    ? "Property"
    : "PG"}
</th>

                    <th className="text-left px-6 py-4">
                      City
                    </th>

                   <th className="text-left px-6 py-4">
  {pendingView === "properties"
    ? "Price"
    : "Rent"}
</th>

                    <th className="text-center px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                 {paginatedPending.map((item) => (
  <tr
    key={item._id}
    className="border-t hover:bg-gray-50"
  >
    <td className="px-6 py-4 font-semibold">
      {item.title}
    </td>

    <td className="px-6 py-4">
      {item.city}
    </td>

    <td className="px-6 py-4">
      ₹
      {pendingView === "properties"
        ? item.price
        : item.rent}
    </td>

    <td className="px-6 py-4">
      <div className="flex justify-center gap-2">

        <button
          onClick={() =>
            navigate(
  pendingView === "properties"
    ? `/properties/${item._id}`
    : `/pgs/${item._id}`,
  {
    state: {
      fromAdmin: true,
      activeTab,
      pendingView,
      page: pendingPage,
    },
  }
)
          }
          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
        >
          View
        </button>

        <button
          onClick={() =>
            pendingView === "properties"
              ? handleApprove(item._id)
              : handleApprovePG(item._id)
          }
          className="bg-green-600 text-white px-3 py-2 rounded-lg"
        >
          Approve
        </button>

      </div>
    </td>
  </tr>
))}
                      
                </tbody>

              </table>
            </div>

            <div className="flex justify-center items-center gap-3 mt-6 mb-6">

              <button
                disabled={pendingPage === 1}
                onClick={() =>
                  setPendingPage(pendingPage - 1)
                }
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <span className="font-medium">
                Page {pendingPage} of {pendingTotalPages}
              </span>

              <button
                disabled={
                  pendingPage === pendingTotalPages
                }
                onClick={() =>
                  setPendingPage(
                    pendingPage + 1
                  )
                }
                className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>

            </div>

        </div>
</>
)}

   {activeTab === "approved" && (
  <>
    <div className="flex gap-3 mb-5">
      <button
        onClick={() =>
          setApprovedView("properties")
        }
        className={`px-5 py-2 rounded-lg font-medium ${
          approvedView === "properties"
            ? "bg-purple-600 text-white"
            : "bg-gray-200"
        }`}
      >
        Properties
      </button>

      <button
        onClick={() =>
          setApprovedView("pgs")
        }
        className={`px-5 py-2 rounded-lg font-medium ${
          approvedView === "pgs"
            ? "bg-purple-600 text-white"
            : "bg-gray-200"
        }`}
      >
        PGs
      </button>
    </div>

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          {approvedView === "properties"
            ? "Approved Properties"
            : "Approved PGs"}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4">
                {approvedView === "properties"
                  ? "Property"
                  : "PG"}
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
            {paginatedApproved.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-semibold">
                  {item.title}
                </td>

                <td className="px-6 py-4">
                  {item.city}
                </td>

                <td className="px-6 py-4">
                  {item.views || 0}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(
  approvedView === "properties"
    ? `/properties/${item._id}`
    : `/pgs/${item._id}`,
  {
    state: {
      fromAdmin: true,
      activeTab,
      approvedView,
      page: approvedPage,
    },
  }
)
                      }
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        approvedView ===
                        "properties"
                          ? handleDisapprove(
                              item._id
                            )
                          : handleDisapprovePG(
                              item._id
                            )
                      }
                      className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                    >
                      Disapprove
                    </button>

                    <button
                      onClick={() =>
                        approvedView ===
                        "properties"
                          ? handleDelete(
                              item._id
                            )
                          : handleDeletePG(
                              item._id
                            )
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-3 mt-6 mb-6">
        <button
          disabled={approvedPage === 1}
          onClick={() =>
            setApprovedPage(
              approvedPage - 1
            )
          }
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {approvedPage} of{" "}
          {approvedTotalPages}
        </span>

        <button
          disabled={
            approvedPage ===
            approvedTotalPages
          }
          onClick={() =>
            setApprovedPage(
              approvedPage + 1
            )
          }
          className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </>
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

                  {paginatedSupport.map(
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

<div className="flex justify-center items-center gap-3 mt-6 mb-6">

  <button
    disabled={supportPage === 1}
    onClick={() =>
      setSupportPage(
        supportPage - 1
      )
    }
    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
  >
    Previous
  </button>

  <span className="font-medium">
    Page {supportPage} of {supportTotalPages}
  </span>

  <button
    disabled={
      supportPage === supportTotalPages
    }
    onClick={() =>
      setSupportPage(
        supportPage + 1
      )
    }
    className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
  >
    Next
  </button>

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
      {confirmModal.show && (
  <ConfirmModal
    title={confirmModal.title}
    message={confirmModal.message}
    onConfirm={confirmModal.onConfirm}
    onCancel={() =>
      setConfirmModal({
        show: false,
        title: "",
        message: "",
        onConfirm: null,
      })
    }
  />
)}
      <Footer />
    </>
  );
}

export default AdminDashboard;