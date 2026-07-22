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
import VisitsTable from "../components/adminDashboard/VisitsTable";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const [properties, setProperties] =
    useState([]);

  const [userSearch, setUserSearch] = useState("");
  const [userRole, setUserRole] = useState("All");
  const [userSort, setUserSort] = useState("Newest");

  // Pending Filters
  const [pendingSearch, setPendingSearch] = useState("");
  const [pendingCity, setPendingCity] = useState("All");
  const [pendingSort, setPendingSort] = useState("Newest");

  // Approved Filters
  const [approvedSearch, setApprovedSearch] = useState("");
  const [approvedCity, setApprovedCity] = useState("All");
  const [approvedSort, setApprovedSort] = useState("Newest");
  const [pgs, setPgs] =
    useState([]);

  const [supportMessages, setSupportMessages] =
    useState([]);

  const [subscriptions, setSubscriptions] =
    useState([]);

  const [supportSearch, setSupportSearch] =
    useState("");

  const [supportStatus, setSupportStatus] =
    useState("All");

  const [propertySearch, setPropertySearch] = useState("");
  const [propertyCity, setPropertyCity] = useState("All");
  const [propertySort, setPropertySort] = useState("Newest");

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

    const [visits, setVisits] = useState([]);

const [visitStats, setVisitStats] = useState({
  totalVisits: 0,
  pendingVisits: 0,
  approvedVisits: 0,
  completedVisits: 0,
  rejectedVisits: 0,
  cancelledVisits: 0,
});

const [visitSearch, setVisitSearch] = useState("");
const [visitStatus, setVisitStatus] = useState("All");
const [visitSort, setVisitSort] = useState("Newest");

const [visitPage, setVisitPage] = useState(1);

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

fetch("http://localhost:5000/api/visits/admin/all", {
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setVisits(data.visits);
    }
  });

fetch("http://localhost:5000/api/visits/admin/stats", {
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setVisitStats(data.stats);
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

  const handleExportUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/export/users",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "PropertyHub_Users.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      setToast({
        show: true,
        message:
          "Users exported successfully.",
        type: "success",
      });
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          "Failed to export users.",
        type: "error",
      });
    }
  };

  const handleExportProperties = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/export/properties",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "PropertyHub_Properties.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      setToast({
        show: true,
        message: "Properties exported successfully.",
        type: "success",
      });
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to export properties.",
        type: "error",
      });
    }
  };

  const handleExportPGs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/export/pgs",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "PropertyHub_PGs.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      setToast({
        show: true,
        message: "PGs exported successfully.",
        type: "success",
      });
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to export PGs.",
        type: "error",
      });
    }
  };

  const handleExportSubscriptions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/export/subscriptions",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download =
        "PropertyHub_Subscriptions.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      setToast({
        show: true,
        message:
          "Subscriptions exported successfully.",
        type: "success",
      });
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          "Failed to export subscriptions.",
        type: "error",
      });
    }
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

  const filteredProperties = [...propertyData]
    .filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(propertySearch.toLowerCase())
    )
    .filter((item) =>
      propertyCity === "All"
        ? true
        : item.city?.toLowerCase() ===
        propertyCity.toLowerCase()
    );

  switch (propertySort) {
    case "Oldest":
      filteredProperties.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
      break;

    case "Highest Price":
      filteredProperties.sort(
        (a, b) =>
          (b.price || b.rent || 0) -
          (a.price || a.rent || 0)
      );
      break;

    case "Lowest Price":
      filteredProperties.sort(
        (a, b) =>
          (a.price || a.rent || 0) -
          (b.price || b.rent || 0)
      );
      break;

    default:
      filteredProperties.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
  }

  const propertyTotalPages =
    Math.ceil(
      filteredProperties.length / ROWS_PER_PAGE
    ) || 1;

  const paginatedProperties =
    filteredProperties.slice(
      (propertyPage - 1) *
      ROWS_PER_PAGE,
      propertyPage *
      ROWS_PER_PAGE
    );
  const pendingData =
    pendingView === "properties"
      ? pendingProperties
      : pendingPGs;

  const filteredPending = pendingData
    .filter((item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(pendingSearch.toLowerCase());

      const matchesCity =
        pendingCity === "All" ||
        item.city
          ?.trim()
          .toLowerCase()
          .includes(
            pendingCity.trim().toLowerCase()
          );

      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      switch (pendingSort) {
        case "Newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "Oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "Highest Price":
          return (b.price || b.rent) - (a.price || a.rent);

        case "Lowest Price":
          return (a.price || a.rent) - (b.price || b.rent);

        default:
          return 0;
      }
    });

  const pendingTotalPages =
    Math.ceil(filteredPending.length / ROWS_PER_PAGE) || 1;

  const paginatedPending =
    filteredPending.slice(
      (pendingPage - 1) * ROWS_PER_PAGE,
      pendingPage * ROWS_PER_PAGE
    );
  const approvedData =
    approvedView === "properties"
      ? approvedProperties
      : approvedPGs;

  const filteredApproved = approvedData
    .filter((item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(approvedSearch.toLowerCase());

      const matchesCity =
        approvedCity === "All" ||
        item.city === approvedCity;

      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      switch (approvedSort) {
        case "Newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "Oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "Most Viewed":
          return (b.views || 0) - (a.views || 0);

        case "Least Viewed":
          return (a.views || 0) - (b.views || 0);

        default:
          return 0;
      }
    });

  const approvedTotalPages =
    Math.ceil(filteredApproved.length / ROWS_PER_PAGE) || 1;

  const paginatedApproved =
    filteredApproved.slice(
      (approvedPage - 1) * ROWS_PER_PAGE,
      approvedPage * ROWS_PER_PAGE
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

const filteredVisits = visits
  .filter((visit) => {
    const search = visitSearch.toLowerCase();

    const matchesSearch =
      (visit.user?.name || "")
        .toLowerCase()
        .includes(search) ||
      (visit.owner?.name || "")
        .toLowerCase()
        .includes(search) ||
      (visit.propertyTitle || "")
        .toLowerCase()
        .includes(search);

    const matchesStatus =
      visitStatus === "All" ||
      visit.status === visitStatus;

    return matchesSearch && matchesStatus;
  })
  .sort((a, b) => {
    if (visitSort === "Oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

const visitTotalPages =
  Math.ceil(filteredVisits.length / ROWS_PER_PAGE) || 1;

const paginatedVisits = filteredVisits.slice(
  (visitPage - 1) * ROWS_PER_PAGE,
  visitPage * ROWS_PER_PAGE
);

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        (user.name || "")
          .toLowerCase()
          .includes(userSearch.toLowerCase()) ||
        (user.email || "")
          .toLowerCase()
          .includes(userSearch.toLowerCase());

      const matchesRole =
        userRole === "All" ||
        user.role === userRole;

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      switch (userSort) {
        case "Newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "Oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "A-Z":
          return a.name.localeCompare(b.name);

        case "Z-A":
          return b.name.localeCompare(a.name);

        default:
          return 0;
      }
    });

  const userTotalPages =
    Math.ceil(
      filteredUsers.length /
      ROWS_PER_PAGE
    ) || 1;

  const paginatedUsers =
    filteredUsers.slice(
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
    setVisitPage(1);
  }, [activeTab]);

  useEffect(() => {
    setUserPage(1);
  }, [userSearch, userRole, userSort]);

useEffect(() => {
  setVisitPage(1);
}, [visitSearch, visitStatus, visitSort]);

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

  const handleDeleteSupport = async (id) => {
    setConfirmModal({
      show: true,
      title: "Delete Support Message",
      message:
        "Are you sure you want to permanently delete this support message?",
      onConfirm: async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/support/${id}`,
            {
              method: "DELETE",
              credentials: "include",
            }
          );

          const data = await response.json();

          if (data.success) {
            setToast({
              show: true,
              message: "Support message deleted successfully",
              type: "success",
            });

            fetchData();
          }
        } catch (error) {
          console.error(error);

          setToast({
            show: true,
            message: "Failed to delete support message",
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
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"
          }`}
      >
        <section className="w-full px-8 pt-12 pb-10">


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
              handleExportUsers={handleExportUsers}

              userSearch={userSearch}
              setUserSearch={setUserSearch}

              userRole={userRole}
              setUserRole={setUserRole}

              userSort={userSort}
              setUserSort={setUserSort}
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
              handleExportProperties={handleExportProperties}
              handleExportPGs={handleExportPGs}
              propertySearch={propertySearch}
              setPropertySearch={setPropertySearch}
              propertyCity={propertyCity}
              setPropertyCity={setPropertyCity}
              propertySort={propertySort}
              setPropertySort={setPropertySort}
              propertiesData={propertyData}
              allProperties={propertyData}
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
              handleDelete={handleDelete}
              handleDeletePG={handleDeletePG}
              pendingSearch={pendingSearch}
              setPendingSearch={setPendingSearch}
              pendingCity={pendingCity}
              setPendingCity={setPendingCity}
              pendingSort={pendingSort}
              setPendingSort={setPendingSort}
            />
          )}

          {activeTab === "approved" && (
            <ApprovedTable
              approvedView={approvedView}
              setApprovedView={setApprovedView}
              approvedData={approvedData}
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
              approvedSearch={approvedSearch}
              setApprovedSearch={setApprovedSearch}
              approvedCity={approvedCity}
              setApprovedCity={setApprovedCity}
              approvedSort={approvedSort}
              setApprovedSort={setApprovedSort}
            />
          )}

          {activeTab === "support" && (
            <SupportTable
              paginatedSupport={paginatedSupport}
              supportPage={supportPage}
              supportTotalPages={supportTotalPages}
              supportSearch={supportSearch}
              setSupportSearch={setSupportSearch}

              supportStatus={supportStatus}
              setSupportStatus={setSupportStatus}
              setSupportPage={setSupportPage}
              handleDeleteSupport={handleDeleteSupport}
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
              handleExportSubscriptions={
                handleExportSubscriptions
              }
            />
          )}

{activeTab === "visits" && (
  <VisitsTable
    visits={paginatedVisits}
    visitStats={visitStats}
    visitPage={visitPage}
    visitTotalPages={visitTotalPages}
    setVisitPage={setVisitPage}
    visitSearch={visitSearch}
    setVisitSearch={setVisitSearch}
    visitStatus={visitStatus}
    setVisitStatus={setVisitStatus}
    visitSort={visitSort}
    setVisitSort={setVisitSort}
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