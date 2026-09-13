import api from "../../services/api";

export const getMyVideos = async (page) => {
  const response = await api.get("/video/my-video", {
    params: {
      page: page,
    },
  });

  return response.data;
};

export const getVideoById = async (videoId) => {
  const response = await api.get(`/video/watch-video/${videoId}`);

  return response.data;
};

export const getAllVideos = async (page) => {
  const response = await api.get("/video/fetch-all-videos", {
    params: {
      page: page,
    },
  });
  return response.data;
};

export const uploadVideo = async (formData) => {
  const response = await api.post("/videos", formData);

  return response.data;
};

export const updateVideo = async ({ videoId, data }) => {
  const response = await api.patch(`/videos/${videoId}`, data);

  return response.data;
};

export const deleteVideo = async (videoId) => {
  const response = await api.delete(`/videos/${videoId}`);

  return response.data;
};
