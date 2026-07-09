import axios from "axios";

const API = "http://localhost:5000/api/pg-reviews";

const config = {
  withCredentials: true,
};

export const getPGReviews = async (pgId) => {
  const response = await axios.get(
    `${API}/${pgId}`
  );
  return response.data;
};

export const addReview = async (
  reviewData
) => {
  const response = await axios.post(
    API,
    reviewData,
    config
  );
  return response.data;
};

export const updateReview = async (
  reviewId,
  reviewData
) => {
  const response = await axios.put(
    `${API}/${reviewId}`,
    reviewData,
    config
  );
  return response.data;
};

export const deleteReview = async (
  reviewId
) => {
  const response = await axios.delete(
    `${API}/${reviewId}`,
    config
  );
  return response.data;
};

export const replyToReview = async (
  reviewId,
  ownerReply
) => {
  const response = await axios.put(
    `${API}/reply/${reviewId}`,
    { ownerReply },
    config
  );
  return response.data;
};

export const deleteReply = async (
  reviewId
) => {
  const response = await axios.delete(
    `${API}/reply/${reviewId}`,
    config
  );
  return response.data;
};

export const toggleLike = async (
  reviewId
) => {
  const response = await axios.put(
    `${API}/like/${reviewId}`,
    {},
    config
  );
  return response.data;
};

export const toggleDislike = async (
  reviewId
) => {
  const response = await axios.put(
    `${API}/dislike/${reviewId}`,
    {},
    config
  );
  return response.data;
};