import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { getCreatorProfile } from "./creatorApi";

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
