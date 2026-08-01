import api from "../../services/api";

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};


export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};