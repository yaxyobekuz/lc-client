import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";
import { teacherSalaryAPI } from "../api/teacherSalary.api";

export const useRatePeriodsQuery = ({ teacher, group }, options = {}) =>
  useQuery({
    queryKey: qk.teacherSalary.ratePeriods({ teacher, group }),
    queryFn: () => teacherSalaryAPI.ratePeriods({ teacher, group }).then((r) => r.data.data),
    enabled: !!teacher && !!group,
    ...options,
  });

// Stavka davri o'zgarishi → o'sha o'qituvchi maoshlari qayta hisoblanadi.
const useInvalidate = () => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: qk.teacherSalary.all() });
};

export const useRatePeriodCreateMutation = (options = {}) => {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (body) => teacherSalaryAPI.createRatePeriod(body).then((r) => r.data.data),
    onSuccess: (...a) => {
      invalidate();
      toast.success("Stavka davri qo'shildi");
      options.onSuccess?.(...a);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export const useRatePeriodUpdateMutation = (options = {}) => {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ id, body }) =>
      teacherSalaryAPI.updateRatePeriod(id, body).then((r) => r.data.data),
    onSuccess: (...a) => {
      invalidate();
      toast.success("Stavka davri yangilandi");
      options.onSuccess?.(...a);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export const useRatePeriodRemoveMutation = (options = {}) => {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (id) => teacherSalaryAPI.removeRatePeriod(id).then((r) => r.data.data),
    onSuccess: (...a) => {
      invalidate();
      toast.success("Stavka davri o'chirildi");
      options.onSuccess?.(...a);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};
