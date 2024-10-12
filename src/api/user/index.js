import axiosInstance from "../../utils/axios";

const handleLogin = (email, password) => {
  return axiosInstance.post("/auth/login", {
    email,
    password,
  });
};

const handleCreateAccessToken = (refresh_token) => {
  return axiosInstance.post("/auth/refresh_token", {
    refresh_token,
  });
};

const handeSignUp = (data) => {
  return axiosInstance.post("/auth/sign-up", data);
};

export { handleLogin, handleCreateAccessToken, handeSignUp };
