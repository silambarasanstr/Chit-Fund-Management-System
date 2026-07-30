import api from "./api";

export const getChitGroups = async () => {
  const response = await api.get("/chit-groups");
  console.log(response.data);
  return response.data;
};

export const getChitGroupsById = async (id) => {
  const response = await api.get(`/chit-groups/${id}`);
  console.log(response.data);
  return response.data;
};

export const createChitGroup = async (chitGroupData) => {
  const response = await api.post("/chit-groups", chitGroupData);
  console.log(response.data);
  return response.data;
};

export const updateChitGroup = async (id, chitGroupData) => {
  const response = await api.put(`/chit-groups/${id}`, chitGroupData);
  console.log(response.data);
  return response.data;
};

export const deleteChitGroup = async (id) => {
  const response = await api.delete(`/chit-groups/${id}`);
  console.log(response.data);
  return response.data;
};
