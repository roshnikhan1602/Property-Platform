import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/stats`;

export const getPlatformStats = async () => {
  const response = await axios.get(API);
  return response.data;
};