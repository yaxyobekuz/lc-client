// Tanstack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Router
import { useNavigate } from "react-router-dom";

// Sonner
import { toast } from "sonner";

// API
import { authAPI } from "@/features/auth/api/auth.api";

// Constants
import { qk } from "@/shared/lib/query/keys";
import { ROLE_HOME } from "@/shared/constants/roles";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => authAPI.login(body).then((r) => r.data.data),
    onSuccess: async (data) => {
      // Refresh stays in the httpOnly cookie; only the access token lives in localStorage
      localStorage.setItem("authToken", data.accessToken);
      await queryClient.invalidateQueries({ queryKey: qk.auth.me() });
      toast.success("Tizimga muvaffaqiyatli kirildi");
      navigate(ROLE_HOME[data.user?.role] || "/", { replace: true });
    },
    onError: (e) => {
      const message = e?.response?.data?.message || "Login yoki parol noto'g'ri";
      toast.error(message);
    },
  });
};

export default useLogin;
