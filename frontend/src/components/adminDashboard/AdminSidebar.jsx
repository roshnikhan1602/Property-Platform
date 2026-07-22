import {
  FaBars,
  FaUsers,
  FaBuilding,
  FaBed,
  FaHeadset,
  FaCreditCard,
  FaClock,
  FaCalendarCheck,
} from "react-icons/fa";

function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  setActiveTab,
}) {
  return (
    <div
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
      className={`fixed top-0 left-0 h-screen bg-white shadow-xl z-50 overflow-hidden transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="h-16 flex items-center justify-center border-b">
        <FaBars className="text-xl text-blue-600" />
      </div>

      <div className="flex flex-col gap-3 pt-8 px-2">

        <button
          onClick={() => setActiveTab("users")}
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-100"
        >
          <FaUsers className="min-w-[22px]" />
          <span
            className={`transition-all duration-300 whitespace-nowrap ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Users
          </span>
        </button>

        <button
          onClick={() => setActiveTab("properties")}
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-100"
        >
          <FaBuilding className="min-w-[22px]" />
          <span
            className={`transition-all duration-300 whitespace-nowrap ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Properties
          </span>
        </button>

        <button
          onClick={() => setActiveTab("pending")}
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-100"
        >
          <FaClock className="min-w-[22px]" />
          <span
            className={`transition-all duration-300 whitespace-nowrap ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Pending
          </span>
        </button>

        <button
          onClick={() => setActiveTab("approved")}
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-100"
        >
          <FaBed className="min-w-[22px]" />
          <span
            className={`transition-all duration-300 whitespace-nowrap ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Approved
          </span>
        </button>

        <button
          onClick={() =>
            setActiveTab("subscriptions")
          }
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-100"
        >
          <FaCreditCard className="min-w-[22px]" />
          <span
            className={`transition-all duration-300 whitespace-nowrap ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Subscriptions
          </span>
        </button>

<button
  onClick={() => setActiveTab("visits")}
  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-100"
>
  <FaCalendarCheck className="min-w-[22px]" />
  <span
    className={`transition-all duration-300 whitespace-nowrap ${
      sidebarOpen ? "opacity-100" : "opacity-0"
    }`}
  >
    Visits
  </span>
</button>

        <button
          onClick={() => setActiveTab("support")}
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-100"
        >
          <FaHeadset className="min-w-[22px]" />
          <span
            className={`transition-all duration-300 whitespace-nowrap ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Support
          </span>
        </button>

      </div>
    </div>
  );
}

export default AdminSidebar;