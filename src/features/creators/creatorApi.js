import api from "../../services/api";

export const getCreatorProfile = async (username) => {
  const response = await api.get(`/users/c/:${username}`);
console.log(response);

  return response.data;
};
