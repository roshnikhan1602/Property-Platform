const BASE_URL = `${import.meta.env.VITE_API_URL}/api/properties`;

export const getPropertyById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const getMyProperties = async (userId) => {
  const res = await fetch(`${BASE_URL}/my-properties/${userId}`);
  return res.json();
};