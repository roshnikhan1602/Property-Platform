import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";
import ConfirmModal from "../components/common/ConfirmModal";
import AdminSidebar from "../components/adminDashboard/AdminSidebar";
import AnalyticsCards from "../components/adminDashboard/AnalyticsCards";
import UsersTable from "../components/adminDashboard/UsersTable";
import PropertiesTable from "../components/adminDashboard/PropertiesTable";
import PendingTable from "../components/adminDashboard/PendingTable";
import ApprovedTable from "../components/adminDashboard/ApprovedTable";
import SupportTable from "../components/adminDashboard/SupportTable";
import SubscriptionsTable from "../components/adminDashboard/SubscriptionsTable";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const [properties, setProperties] =
    useState([]);

  const [pgs, setPgs] =
    useState([]);

  const [supportMessages, setSupportMessages] =
    useState([]);

    const [subscriptions, setSubscriptions] =
  useState([]);

    const [dashboardStats, setDashboardStats] =
  useState({
    totalUsers: 0,
    totalOwners: 0,
    totalProperties: 0,
    totalPGs: 0,
    freeUsers: 0,
    premiumUsers: 0,
    eliteUsers: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalPayments: 0,
    upgrades: 0,
    downgrades: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] =
    useState("");

    const [subscriptionSearch, setSubscriptionSearch] =
  useState("");

  const [subscriptionPlan, setSubscriptionPlan] =
  useState("All");

  const [subscriptionStatus, setSubscriptionStatus] =
  useState("All");

  const [subscriptionSort, setSubscriptionSort] =
  useState("Newest");

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
      fetch(
  "http://localhost:5000/api/admin/dashboard-stats",
  {
    credentials: "include",
  }
)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setDashboardStats(data.stats);
    }
  });

  fetch(
  "http://localhost:5000/api/admin/subscriptions",
  {
    credentials: "include",
  }
)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setSubscriptions(
        data.subscriptions
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
  const [
  subscriptionPage,
  setSubscriptionPage,
] = useState(1);
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

const filteredSubscriptions = subscriptions
  .filter((subscription) => {
    const matchesSearch =
      (subscription.user?.name || "")
        .toLowerCase()
        .includes(
          subscriptionSearch.toLowerCase()
        );

    const matchesPlan =
      subscriptionPlan === "All" ||
      subscription.plan === subscriptionPlan;

    const matchesStatus =
      subscriptionStatus === "All" ||
      subscription.status ===
        subscriptionStatus;

    return (
      matchesSearch &&
      matchesPlan &&
      matchesStatus
    );
  })
  .sort((a, b) => {
    switch (subscriptionSort) {
      case "Newest":
        return (
          new Date(b.startDate) -
          new Date(a.startDate)
        );

      case "Oldest":
        return (
          new Date(a.startDate) -
          new Date(b.startDate)
        );

      case "Highest Amount":
        return b.amount - a.amount;

      case "Lowest Amount":
        return a.amount - b.amount;

      case "Expiry Soon":
        return (
          new Date(a.endDate) -
          new Date(b.endDate)
        );

      case "Latest Expiry":
        return (
          new Date(b.endDate) -
          new Date(a.endDate)
        );

      default:
        return 0;
    }
  });

const subscriptionTotalPages =
  Math.ceil(
    filteredSubscriptions.length /
      ROWS_PER_PAGE
  ) || 1;

const paginatedSubscriptions =
  filteredSubscriptions.slice(
    (subscriptionPage - 1) *
      ROWS_PER_PAGE,
    subscriptionPage *
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
  setSubscriptionPage(1);
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
    <Navbar sidebarOpen={sidebarOpen} />
    <AdminSidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  setActiveTab={setActiveTab}
/>

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

<div
  className={`transition-all duration-300 ${
    sidebarOpen ? "ml-64" : "ml-16"
  }`}
>
 <section className="max-w-7xl mx-auto px-6 pt-12 pb-10">


    {/* Analytics Cards */}

{activeTab === "" && (
 <AnalyticsCards
  dashboardStats={dashboardStats}
  pendingProperties={pendingProperties}
  pendingPGs={pendingPGs}
  approvedProperties={approvedProperties}
  approvedPGs={approvedPGs}
  supportMessages={supportMessages}
/>
)}

{activeTab === "users" && (
  <UsersTable
    paginatedUsers={paginatedUsers}
    userPage={userPage}
    userTotalPages={userTotalPages}
    setUserPage={setUserPage}
    handleViewUser={handleViewUser}
    handleDeleteUser={handleDeleteUser}
  />
)}

{activeTab === "properties" && (
  <PropertiesTable
    propertyView={propertyView}
    setPropertyView={setPropertyView}
    paginatedProperties={paginatedProperties}
    propertyPage={propertyPage}
    propertyTotalPages={propertyTotalPages}
    setPropertyPage={setPropertyPage}
    navigate={navigate}
    activeTab={activeTab}
    handleDelete={handleDelete}
    handleDeletePG={handleDeletePG}
  />
)}
       
       {activeTab === "pending" && (
  <PendingTable
    pendingView={pendingView}
    setPendingView={setPendingView}
    paginatedPending={paginatedPending}
    pendingPage={pendingPage}
    pendingTotalPages={pendingTotalPages}
    setPendingPage={setPendingPage}
    navigate={navigate}
    activeTab={activeTab}
    handleApprove={handleApprove}
    handleApprovePG={handleApprovePG}
  />
)}

 {activeTab === "approved" && (
  <ApprovedTable
    approvedView={approvedView}
    setApprovedView={setApprovedView}
    paginatedApproved={paginatedApproved}
    approvedPage={approvedPage}
    approvedTotalPages={approvedTotalPages}
    setApprovedPage={setApprovedPage}
    navigate={navigate}
    activeTab={activeTab}
    handleDisapprove={handleDisapprove}
    handleDisapprovePG={handleDisapprovePG}
    handleDelete={handleDelete}
    handleDeletePG={handleDeletePG}
  />
)}

       {activeTab === "support" && (
  <SupportTable
    paginatedSupport={paginatedSupport}
    supportPage={supportPage}
    supportTotalPages={supportTotalPages}
    setSupportPage={setSupportPage}
    setSelectedMessageId={setSelectedMessageId}
    setShowReplyModal={setShowReplyModal}
    handleResolve={handleResolve}
  />
)}

{activeTab === "subscriptions" && (
<SubscriptionsTable
  subscriptions={paginatedSubscriptions}
  subscriptionPage={subscriptionPage}
  subscriptionTotalPages={subscriptionTotalPages}
  setSubscriptionPage={setSubscriptionPage}
  subscriptionSearch={subscriptionSearch}
  setSubscriptionSearch={setSubscriptionSearch}
  subscriptionPlan={subscriptionPlan}
  setSubscriptionPlan={setSubscriptionPlan}
  subscriptionStatus={subscriptionStatus}
  setSubscriptionStatus={setSubscriptionStatus}
  subscriptionSort={subscriptionSort}
setSubscriptionSort={setSubscriptionSort}
/>
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
</div>

      <Footer />
    </>
  );
}

export default AdminDashboard;