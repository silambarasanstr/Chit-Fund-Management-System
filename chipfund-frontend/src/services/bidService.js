import api from "./api";

export const getBids = async () => {
  const response = await api.get("/bids");
  return response.data;
};

export const getBid = async (id) => {
  const response = await api.get(`/bids/${id}`);
  return response.data;
};

export const createBid = async (bidData) => {
  const response = await api.post("/bids", bidData);
  return response.data;
};

export const updateBid = async (id, bidData) => {
  const response = await api.put(`/bids/${id}`, bidData);
  return response.data;
};

export const deleteBid = async (id) => {
  const response = await api.delete(`/bids/${id}`);
  return response.data;
};
