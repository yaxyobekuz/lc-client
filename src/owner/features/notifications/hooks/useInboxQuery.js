import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notificationsAPI } from "../api/notifications.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

export const useInboxQuery = (params = {}) =>
  useQuery({
    queryKey: qk.notifications.inbox(params),
    queryFn: () => notificationsAPI.inbox(params).then((r) => r.data),
  });

export const useUnreadCountQuery = () =>
  useQuery({
    queryKey: qk.notifications.unreadCount(),
    queryFn: () => notificationsAPI.unreadCount().then((r) => r.data.data),
    refetchInterval: 30 * 1000,
  });

export const useMarkReadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => notificationsAPI.markRead(id).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications", "inbox"] });
    },
  });
};

export const useMarkAllReadMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsAPI.markAllRead().then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications", "inbox"] });
      toast.success("Hammasi o'qildi");
    },
    onError: (err) => apiErrorToast(err),
  });
};
