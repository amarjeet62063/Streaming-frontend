import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMyVideos,
  getVideoById,
  uploadVideo,
  updateVideo,
  deleteVideo,
} from "./videoApi";

export const useMyVideos = (page = 1) => {
  return useQuery({
    queryKey: ["myVideos", page],
    queryFn:()=> getMyVideos(page),
    placeholderData: (previousData) => previousData,
  });
};

export const useVideo = (videoId) => {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId),
    enabled: !!videoId,
  });
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadVideo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myVideos"],
      });
    },
  });
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVideo,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["video", variables.videoId],
      });

      queryClient.invalidateQueries({
        queryKey: ["myVideos"],
      });
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVideo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myVideos"],
      });
    },
  });
};
