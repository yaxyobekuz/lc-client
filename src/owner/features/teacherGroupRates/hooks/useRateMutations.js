import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { teacherGroupRatesAPI } from "../api/teacherGroupRates.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";

const handleErr = (err) =>
  apiErrorToast(err);

export const useRateCreateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => teacherGroupRatesAPI.create(body).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.teacherGroupRates.all() });
      toast.success("Stavka yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useRateUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) =>
      teacherGroupRatesAPI.update(id, body).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.teacherGroupRates.all() });
      toast.success("Stavka yangilandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useRateRemoveMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => teacherGroupRatesAPI.remove(id).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.teacherGroupRates.all() });
      toast.success("Stavka o'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};
