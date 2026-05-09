// Tanstack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Router
import { useNavigate } from "react-router-dom";

// API
import { authAPI } from "@/features/auth/api/auth.api";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authAPI.logout().catch(() => null),
    onSettled: () => {
      localStorage.removeItem("authToken");
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
};

export default useLogout;
