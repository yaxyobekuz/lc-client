import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studentFreezesAPI } from "../api/studentFreezes.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

// Muzlatish davomat foiziga ta'sir qiladi → barcha davomat query'lari + freeze ro'yxati yangilanadi
const useInvalidate = () => {
  const qc = useQueryClient();
  return (studentId) => {
    qc.invalidateQueries({ queryKey: qk.studentFreezes.all() });
    qc.invalidateQueries({ queryKey: qk.attendance.all() });
    if (studentId) qc.invalidateQueries({ queryKey: qk.users.one(studentId) });
  };
};

export const useFreezeCreateMutation = (options = {}) => {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (body) =>
      studentFreezesAPI.create(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate(vars.student);
      toast.success("O'quvchi muzlatildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export const useFreezeUpdateMutation = (options = {}) => {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ id, body }) =>
      studentFreezesAPI.update(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate(data?.student);
      toast.success("Saqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export const useFreezeRemoveMutation = (options = {}) => {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (id) => studentFreezesAPI.remove(id).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("Muzlatish bekor qilindi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};
