const BASE_URL = "http://localhost:5000/api/reviews";

export const addReview = async (reviewData) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  return response.json();
};

export const getPropertyReviews = async (
  propertyId
) => {
  const response = await fetch(
    `${BASE_URL}/property/${propertyId}`
  );

  return response.json();
};

export const updateReview = async (
  reviewId,
  reviewData
) => {
  const response = await fetch(
    `${BASE_URL}/update/${reviewId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );

  return response.json();
};

export const deleteReview = async (
  reviewId
) => {
  const response = await fetch(
    `${BASE_URL}/delete/${reviewId}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};

export const replyToReview = async (
  reviewId,
  ownerReply
) => {
  const response = await fetch(
    `${BASE_URL}/reply/${reviewId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerReply,
      }),
    }
  );

  return response.json();
};

export const likeReview = async (
  reviewId,
  userId
) => {
  const response = await fetch(
    `${BASE_URL}/like/${reviewId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    }
  );

  return response.json();
};

export const dislikeReview = async (
  reviewId,
  userId
) => {
  const response = await fetch(
    `${BASE_URL}/dislike/${reviewId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    }
  );

  return response.json();
};

