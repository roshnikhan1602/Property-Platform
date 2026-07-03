import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaHeadset,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar({
  activeTab,
  setActiveTab,
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      id: "users",
      label: "Users",
      icon: <FaUsers />,
    },
    {
      id: "pending",
      label: "Pending",
      icon: <FaClock />,
    },
    {
      id: "approved",
      label: "Approved",
      icon: <FaCheckCircle />,
    },
    {
      id: "support",
      label: "Support",
      icon: <FaHeadset />,
    },
  ];

  return (
    <div
      className="
        fixed
        top-20
        left-0
        h-[calc(100vh-80px)]
        w-16
        hover:w-64
        bg-white
        border-r
        shadow-xl
        transition-all
        duration-300
        overflow-hidden
        group
        z-50
      "
    >
      {/* Header */}

      <div className="h-16 flex items-center justify-center border-b">

        <FaBars className="text-2xl text-gray-700" />

      </div>

      {/* Menu */}

      <div className="mt-2">

        {menuItems.map((item) => (

          <button
            key={item.id}
            onClick={() =>
              setActiveTab(item.id)
            }
            className={`w-full flex items-center gap-5 px-5 py-4 transition cursor-pointer ${
              activeTab === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >

            <span className="text-xl min-w-[24px]">
              {item.icon}
            </span>

            <span
              className="
                whitespace-nowrap
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-200
                font-medium
              "
            >
              {item.label}
            </span>

          </button>

        ))}

      </div>

      {/* Logout */}

      <div className="absolute bottom-0 w-full border-t">

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="w-full flex items-center gap-5 px-5 py-4 text-red-600 hover:bg-red-50 transition cursor-pointer"
        >

          <span className="text-xl min-w-[24px]">
            <FaSignOutAlt />
          </span>

          <span
            className="
              whitespace-nowrap
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-200
              font-medium
            "
          >
            Logout
          </span>

        </button>

      </div>

    </div>
  );
}

export default AdminSidebar;