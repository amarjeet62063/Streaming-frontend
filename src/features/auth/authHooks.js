import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { loginUser, registerUser, logoutUser, getCurrentUser } from "./authApi";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      queryClient.removeQueries({
        queryKey: ["currentUser"],
      });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
};
