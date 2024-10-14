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
  return axiosInstance.get("/customer");
};

export {
  handleLogin,
  handleCreateAccessToken,
  handleSignUp,
  handleGetUserInfo,
};
