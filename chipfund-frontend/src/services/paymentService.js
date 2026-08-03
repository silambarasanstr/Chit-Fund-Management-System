import api from "./api";

export const getPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};

// Get Single Payment
export const getPaymentById = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};

// Create Payment
export const createPayment = async (paymentData) => {
  const response = await api.post("/payments", paymentData);
  return response.data;
};

// Update Payment
export const updatePayment = async (id, paymentData) => {
  const response = await api.put(`/payments/${id}`, paymentData);
  return response.data;
};

// Delete Payment
export const deletePayment = async (id) => {
  const response = await api.delete(`/payments/${id}`);
  return response.data;
};


export const getMyPayments = async () => {
  console.log("Fetching my payments...");
  const response = await api.get("/payments/my-payments");
  console.log(response.data);
  return response.data;
};
