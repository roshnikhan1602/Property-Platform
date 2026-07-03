const BASE_URL = "http://localhost:5000/api/properties";

export const getPropertyById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const getMyProperties = async (userId) => {
  const res = await fetch(`${BASE_URL}/my-properties/${userId}`);
  return res.json();
};