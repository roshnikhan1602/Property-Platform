const BASE_URL =
  "http://localhost:5000/api/notifications";

// Get all notifications
export const getNotifications =
  async () => {
    const response = await fetch(
      BASE_URL,
      {
        credentials: "include",
      }
    );

    return await response.json();
  };

// Get unread notification count
export const getUnreadCount =
  async () => {
    const response = await fetch(
      `${BASE_URL}/unread`,
      {
        credentials: "include",
      }
    );

    return await response.json();
  };

// Mark one notification as read
export const markAsRead =
  async (id) => {
    const response = await fetch(
      `${BASE_URL}/${id}/read`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    return await response.json();
  };

// Mark all notifications as read
export const markAllAsRead =
  async () => {
    const response = await fetch(
      `${BASE_URL}/read-all`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    return await response.json();
  };

// Delete one notification
export const deleteNotification =
  async (id) => {
    const response = await fetch(
      `${BASE_URL}/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    return await response.json();
  };

// Delete all notifications
export const clearNotifications =
  async () => {
    const response = await fetch(
      BASE_URL,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    return await response.json();
  };