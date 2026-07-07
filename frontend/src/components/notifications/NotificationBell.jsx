import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../../services/notificationService";

function NotificationBell({
  isTransparent,
}) {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState([]);

  const [showDropdown, setShowDropdown] =
    useState(false);

  const dropdownRef = useRef(null);

  const loadNotifications = async () => {
    try {
      const data =
        await getNotifications();

      if (data.success) {
        setNotifications(
          data.notifications
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(
      loadNotifications,
      30000
    );

    return () =>
      clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const unreadCount =
    notifications.filter(
      (n) => !n.isRead
    ).length;

  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await deleteNotification(id);
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        onClick={() =>
          setShowDropdown(
            !showDropdown
          )
        }
        className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
      >
        <FaBell
            className={`text-2xl ${
                isTransparent
                ? "text-white drop-shadow-lg"
                : "text-gray-700"
            }`}
            />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl border z-50">

          <div className="px-4 py-3 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">
              Notifications
            </h2>

            <button
              onClick={() => {
                setShowDropdown(
                  false
                );

                navigate(
                  "/notifications"
                );
              }}
              className="text-blue-600 text-sm hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          {notifications.length ===
          0 ? (
            <div className="p-8 text-center text-gray-500">
              No Notifications
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications
                .slice(0, 5)
                .map(
                  (
                    notification
                  ) => (
                    <div
                      key={
                        notification._id
                      }
                      className={`border-b p-4 ${
                        !notification.isRead
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <h3 className="font-semibold">
                        {
                          notification.title
                        }
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        {
                          notification.message
                        }
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </p>

                      <div className="flex gap-2 mt-3">
                        {!notification.isRead && (
                          <button
                            onClick={() =>
                              handleRead(
                                notification._id
                              )
                            }
                            className="text-green-600 text-sm hover:underline cursor-pointer"
                          >
                            Mark Read
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleDelete(
                              notification._id
                            )
                          }
                          className="text-red-600 text-sm hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;