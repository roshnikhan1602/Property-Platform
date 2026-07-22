const API = "http://localhost:5000/api/wishlist";

export const checkWishlistStatus = async (
  itemId,
  itemType
) => {
  const response = await fetch(
    `${API}/status?itemId=${itemId}&itemType=${itemType}`,
    {
      credentials: "include",
    }
  );

  return response.json();
};

export const addToWishlist = async (
  itemId,
  itemType
) => {
  const response = await fetch(
    `${API}/add`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        itemType,
      }),
    }
  );

  return response.json();
};

export const removeFromWishlist = async (
  itemId,
  itemType
) => {
  const response = await fetch(
    `${API}/remove`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        itemType,
      }),
    }
  );

  return response.json();
};