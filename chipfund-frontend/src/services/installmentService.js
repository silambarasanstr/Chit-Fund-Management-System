import api from "./api";

export const getInstallments = async () => {
  const response = await api.get("/installments");
  return response.data;
};

export const createInstallment = async (installmentData) => {
  const response = await api.post("/installments", installmentData);
  return response.data;
};

export const updateInstallment = async (id, installmentData) => {
  const response = await api.put(`/installments/${id}`, installmentData);
  return response.data;
};

export const deleteInstallment = async (id) => {
  const response = await api.delete(`/installments/${id}`);
  return response.data;
};

export const payInstallment = async (id) => {
  console.log(id);
  const response = await api.post(`/installments/${id}/pay`);
  return response.data;
};

export const getMyInstallments = async () => {
  const response = await api.get("/installments/my-installments");
  return response.data;
};

export const getInstallmentGroupId = async (groupId) => {
  const response = await api.get(`/installments/group/${groupId}`);
  return response.data;
};
