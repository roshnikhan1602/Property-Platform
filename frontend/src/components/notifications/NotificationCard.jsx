import {
  FaCheckCircle,
  FaTrash,
  FaHome,
  FaBed,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

function NotificationCard({
  notification,
  onRead,
  onDelete,
}) {
  const getIcon = () => {
    switch (notification.type) {
      case "property":
        return (
          <FaHome className="text-blue-600 text-xl" />
        );

      case "pg":
        return (
          <FaBed className="text-green-600 text-xl" />
        );

      case "approved":
        return (
          <FaCheckCircle className="text-green-600 text-xl" />
        );

      case "rejected":
        return (
          <FaTimes className="text-red-600 text-xl" />
        );

      default:
        return (
          <FaCheckCircle className="text-gray-600 text-xl" />
        );
    }
  };

  return (
    <div
      className={`bg-white border rounded-xl p-4 shadow-sm transition hover:shadow-md ${
        !notification.isRead
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex gap-3 flex-1">
          {getIcon()}

          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">
              {notification.title}
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              {notification.message}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {new Date(
                notification.createdAt
              ).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {!notification.isRead && (
            <button
              onClick={() =>
                onRead(notification._id)
              }
              className="w-9 h-9 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center transition cursor-pointer"
              title="Mark as Read"
            >
              <FaCheck />
            </button>
          )}

          <button
            onClick={() =>
              onDelete(notification._id)
            }
            className="w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition cursor-pointer"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;