const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

// ===============================
// SEND SIGNUP OTP
// ===============================

export const sendOTP = async (
  countryCode,
  mobileNumber
) => {
  const response = await fetch(
    `${BASE_URL}/send-otp`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode,
        mobileNumber,
      }),
    }
  );

  return response.json();
};


// ===============================
// VERIFY SIGNUP OTP
// ===============================

export const verifyOTP = async (
  countryCode,
  mobileNumber,
  otp
) => {
  const response = await fetch(
    `${BASE_URL}/verify-otp`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode,
        mobileNumber,
        otp,
      }),
    }
  );

  return response.json();
};


// ===============================
// SIGNUP
// ===============================

export const signup = async (userData) => {
  const response = await fetch(
    `${BASE_URL}/signup`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();
};


// ===============================
// LOGIN
// ===============================

export const login = async (userData) => {
  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();
};


// ===============================
// FORGOT PASSWORD
// ===============================

export const sendForgotPasswordOTP = async (
  countryCode,
  mobileNumber
) => {
  const response = await fetch(
    `${BASE_URL}/forgot-password/send-otp`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode,
        mobileNumber,
      }),
    }
  );

  return response.json();
};


// ===============================
// VERIFY FORGOT PASSWORD OTP
// ===============================

export const verifyForgotPasswordOTP = async (
  countryCode,
  mobileNumber,
  otp
) => {
  const response = await fetch(
    `${BASE_URL}/forgot-password/verify-otp`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode,
        mobileNumber,
        otp,
      }),
    }
  );

  return response.json();
};


// ===============================
// RESET PASSWORD
// ===============================

export const resetPassword = async (
  countryCode,
  mobileNumber,
  password
) => {
  const response = await fetch(
    `${BASE_URL}/forgot-password/reset`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode,
        mobileNumber,
        password,
      }),
    }
  );

  return response.json();
};