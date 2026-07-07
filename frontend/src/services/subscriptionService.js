const BASE_URL =
  "http://localhost:5000/api";

export const getPlans = async () => {
  const response = await fetch(
    `${BASE_URL}/subscriptions/plans`
  );

  return response.json();
};

export const getCurrentSubscription =
  async () => {
    const response = await fetch(
      `${BASE_URL}/subscriptions/current`,
      {
        credentials: "include",
      }
    );

    return response.json();
  };

export const createOrder = async (
  plan,
  amount
) => {
  const response = await fetch(
    `${BASE_URL}/payment/create-order`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        plan,
        amount,
      }),
    }
  );

  return response.json();
};

export const verifyPayment =
  async (paymentData) => {
    const response = await fetch(
      `${BASE_URL}/payment/verify`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          paymentData
        ),
      }
    );

    return response.json();
  };