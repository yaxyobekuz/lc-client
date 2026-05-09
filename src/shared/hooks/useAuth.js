// Tanstack Query
import { useQuery } from "@tanstack/react-query";

// Constants
import { qk } from "@/shared/lib/query/keys";
import { ROLES } from "@/shared/constants/roles";

// API
import { authAPI } from "@/features/auth/api/auth.api";

const useAuth = () => {
  const token = localStorage.getItem("authToken");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: qk.auth.me(),
    queryFn: () => authAPI.getMe().then((r) => r.data.data),
    enabled: Boolean(token),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const user = data?.user || null;
  const role = user?.role || null;
  const permissions = data?.permissions || [];

  return {
    user,
    role,
    permissions,
    isOwner: role === ROLES.OWNER,
    isTeacher: role === ROLES.TEACHER,
    isStudent: role === ROLES.STUDENT,
    isLoading,
    isError,
    isAuthenticated: Boolean(token && user),
    refetch,
  };
};

export default useAuth;
