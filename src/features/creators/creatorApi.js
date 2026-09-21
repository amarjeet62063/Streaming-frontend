import api from "../../services/api";

export const getCreatorProfile = async (userId) => {
  const response = await api.get("/users/c/", {
    params: {
      userId: userId,
    },
  });

  return response.data;
};

export const getCreatorVideos = async (userId, page) => {
  const response = await api.get("/video/fetch-creater-video", {
    params: {
      currentPage: page,
      userId: userId,
    },
  });

  return response.data;
};

export const getSubscriptionToggel = async (channelId) => {
  const respons = await api.post(`/subscription/s/${channelId}`);

  return respons.data;
};
