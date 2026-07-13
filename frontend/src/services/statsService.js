import axios from "axios";

const API = "http://localhost:5000/api/stats";

export const getPlatformStats = async () => {
  const response = await axios.get(API);
  return response.data;
};