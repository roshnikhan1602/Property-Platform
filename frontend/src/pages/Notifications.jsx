import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NotificationCard from "../components/notifications/NotificationCard";
import EmptyNotifications from "../components/notifications/EmptyNotifications";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  const loadNotifications =
    async () => {
      try {
        setLoading(true);

        const data =
          await getNotifications();

        if (data.success) {
          setNotifications(
            data.notifications
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadNotifications();

    const interval =
      setInterval(() => {
        loadNotifications();
      }, 30000);

    return () =>
      clearInterval(interval);
  }, []);

  const handleMarkRead =
    async (id) => {
      try {
        await markAsRead(id);

        loadNotifications();
      } catch (error) {
        console.error(error);
      }
    };

  const handleDelete =
    async (id) => {
      try {
        await deleteNotification(id);

        loadNotifications();
      } catch (error) {
        console.error(error);
      }
    };

  const handleMarkAll =
    async () => {
      try {
        await markAllAsRead();

        loadNotifications();
      } catch (error) {
        console.error(error);
      }
    };

  const handleClear =
    async () => {
      if (
        !window.confirm(
          "Clear all notifications?"
        )
      )
        return;

      try {
        await clearNotifications();

        loadNotifications();
      } catch (error) {
        console.error(error);
      }
    };

  const filteredNotifications =
    notifications.filter((item) => {
      if (filter === "unread")
        return !item.isRead;

      if (filter === "read")
        return item.isRead;

      return true;
    });

  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-28 pb-12">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Notifications
            </h1>

            <p className="text-gray-500 mt-2">
              Stay updated with your
              latest activities.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() =>
                setFilter("all")
              }
              className={`px-4 py-2 rounded-lg ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              All
            </button>

            <button
              onClick={() =>
                setFilter("unread")
              }
              className={`px-4 py-2 rounded-lg ${
                filter ===
                "unread"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Unread
            </button>

            <button
              onClick={() =>
                setFilter("read")
              }
              className={`px-4 py-2 rounded-lg ${
                filter === "read"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Read
            </button>

          </div>

        </div>

        <div className="flex flex-wrap gap-3 mb-8">

          <button
            onClick={handleMarkAll}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Mark All Read
          </button>

          <button
            onClick={handleClear}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Clear All
          </button>

        </div>
                {loading ? (
          <div className="text-center py-16">
            <h2 className="text-xl text-gray-500">
              Loading notifications...
            </h2>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <div className="space-y-4">

            {filteredNotifications.map(
              (notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={
                    notification
                  }
                  onRead={() =>
                    handleMarkRead(
                      notification._id
                    )
                  }
                  onDelete={() =>
                    handleDelete(
                      notification._id
                    )
                  }
                />
              )
            )}

          </div>
        )}

      </section>

      <Footer />
    </>
  );
}

export default Notifications;