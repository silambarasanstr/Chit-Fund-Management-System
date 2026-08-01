import api from "./api";

export const getMembers = async () => {
  const response = await api.get("/members");
  return response.data;
};

export const createMember = async (memberData) => {
  const response = await api.post("/members", memberData);
  return response.data;
};

export const updateMember = async (id, memberData) => {
  const response = await api.put(`/members/${id}`, memberData);
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};

export const bulkDeleteMembers = async (ids) => {
  const response = await api.delete("/members/bulk-delete", {
    data: {
      ids,
    },
  });

  return response.data;
};

export const bulkCreateMembers = async (members) => {
  const response = await api.post("/members/bulk-import", members);
  return response.data;
};
