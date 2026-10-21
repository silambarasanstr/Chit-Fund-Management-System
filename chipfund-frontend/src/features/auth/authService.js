import api from "../../services/api";

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// export const getCurrentUser = async () => {
//   const response = await api.get("/auth/me");
//   return response.data;
// };

// Admin - Registered Users
export const getUsers = async () => {
  const response = await api.get("/auth/users?role=member");
  return response.data;
};
