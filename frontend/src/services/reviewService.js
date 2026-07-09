const BASE_URL = "http://localhost:5000/api/reviews";

export const addReview = async (reviewData) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Add Review Error:", data);
    }

    return data;
  } catch (error) {
    console.error("Add Review Failed:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getPropertyReviews = async (propertyId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/property/${propertyId}`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Get Reviews Error:", data);
    }

    return data;
  } catch (error) {
    console.error("Get Reviews Failed:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateReview = async (
  reviewId,
  reviewData
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/update/${reviewId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Update Review Error:", data);
    }

    return data;
  } catch (error) {
    console.error("Update Review Failed:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/delete/${reviewId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Delete Review Error:", data);
    }

    return data;
  } catch (error) {
    console.error("Delete Review Failed:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const replyToReview = async (
  reviewId,
  ownerReply
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/reply/${reviewId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerReply,
          ownerId: JSON.parse(localStorage.getItem("user"))._id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Reply Error:", data);
    }

    return data;
  } catch (error) {
    console.error("Reply Failed:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteReply = async (reviewId) => {
  try {
    const ownerId = JSON.parse(
      localStorage.getItem("user")
    )._id;

    const response = await fetch(
      `${BASE_URL}/delete-reply/${reviewId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Delete Reply Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const likeReview = async (
  reviewId,
  userId
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/like/${reviewId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Like Error:", data);
    }

    return data;
  } catch (error) {
    console.error("Like Failed:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const dislikeReview = async (
  reviewId,
  userId
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/dislike/${reviewId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Dislike Error:", data);
    }

    return data;
  } catch (error) {
    console.error("Dislike Failed:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};