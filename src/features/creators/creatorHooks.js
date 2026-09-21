import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import {
  getCreatorProfile,
  getCreatorVideos,
  getSubscriptionToggel,
} from "./creatorApi";

export const useCreatorProfile = (userId, page = 1) => {
  return useQueries({
    queries: [
      {
        queryKey: ["creatorProfile", userId],
        queryFn: () => getCreatorProfile(userId),
        enabled: Boolean(userId),
      },
      {
        queryKey: ["creatorVideos", userId, page],
        queryFn: () => getCreatorVideos(userId, page),
        enabled: Boolean(userId),
      },
    ],
  });
};

export const useSubscriptionToggel = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => getSubscriptionToggel(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["creatorProfile"],
      });
    },
  });
};
