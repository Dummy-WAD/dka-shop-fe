import axiosInstance from "../../utils/axios";

const handleLogin = (email, password) => {
  return axiosInstance.post("/auth/login", {
    email,
    password,
  });
};

const handleCreateAccessToken = (refresh_token) => {
  return axiosInstance.post("/auth/refresh-token", {
    refresh_token,
  });
};

const handleSignUp = (data) => {
  return axiosInstance.post("/auth/sign-up", data);
};

const handleGetUserInfo = () => {
  return axiosInstance.get("/auth/current-user");
};

const handleLogout = (refresh_token) => {
  return axiosInstance.post("/auth/logout", {
    refresh_token,
  });
};

const confirmAccount = (token) => {
  return axiosInstance.get(`/auth/confirm-sign-up?token=${token}`);
};

const resendEmail = (email) => {
  return axiosInstance.post("/auth/resend-confirmation-email", {
    email,
  });
};

export {
  handleLogin,
  handleCreateAccessToken,
  handleSignUp,
  handleGetUserInfo,
  handleLogout,
  confirmAccount,
  resendEmail,
};
