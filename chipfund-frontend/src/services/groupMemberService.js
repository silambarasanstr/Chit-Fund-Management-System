import api from "./api";

export const getGroupMembers = async () => {
  const response = await api.get(`/group-members`);
  console.log(response.data);
  return response.data;
};

export const getGroupMemberById = async (id) => {
  const response = await api.get(`/group-members/${id}`);
  console.log(response.data);
  return response.data;
};

export const createGroupMember = async (memberData) => {
  const response = await api.post(`/group-members`, memberData);
  console.log(response.data);
  return response.data;
};

export const updateGroupMember = async (id, memberData) => {
  const response = await api.put(`/group-members/${id}`, memberData);
  console.log(response.data);
  return response.data;
};

export const deleteGroupMember = async (id) => {
  const response = await api.delete(`/group-members/${id}`);
  console.log(response.data);
  return response.data;
};

export const getMembersByGroup = async (groupId) => {
  const response = await api.get(`/group-members/group/${groupId}`);

  console.log("Group Members:", response.data);

  return response.data;
};

export const getGroupsByMember = async (memberId) => {
  const response = await api.get(`/group-members/member/${memberId}`);

  console.log("Member Groups:", response.data);

  return response.data;
};
