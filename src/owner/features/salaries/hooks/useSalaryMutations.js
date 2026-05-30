import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { salariesAPI } from "../api/salaries.api";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";
import { formatMoney } from "@/shared/utils/formatMoney";

// Xatoda toast + modalning onError'ini ham chaqiramiz (setIsLoading(false) uchun)
const makeErr = (options) => (err, vars, ctx) => {
  apiErrorToast(err);
  options.onError?.(err, vars, ctx);
};

export const useCalculateSalariesMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => salariesAPI.calculate(body).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.salaries.all() });
      toast.success("Hisoblandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: makeErr(options),
  });
};

export const useRecomputeSalaryMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => salariesAPI.recompute(id).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.salaries.all() });
      toast.success("Qayta hisoblandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: makeErr(options),
  });
};

export const useApproveSalaryMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => salariesAPI.approve(id).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.salaries.all() });
      toast.success("Tasdiqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: makeErr(options),
  });
};

export const useCancelSalaryMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }) =>
      salariesAPI.cancel(id, { reason }).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.salaries.all() });
      toast.success("Bekor qilindi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: makeErr(options),
  });
};

export const useAddAdjustmentMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) =>
      salariesAPI.addAdjustment(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.salaries.all() });
      toast.success("Qo'shildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: makeErr(options),
  });
};

export const useRemoveAdjustmentMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, adjId }) =>
      salariesAPI.removeAdjustment(id, adjId).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.salaries.all() });
      toast.success("O'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: makeErr(options),
  });
};

export const useRecordPayoutMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) =>
      salariesAPI.recordPayout(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.salaries.all() });
      const carried = Number(data?.carriedToAdvance || 0);
      if (carried > 0) {
        toast.success(
          `To'lov yozildi. ${formatMoney(carried)} keyingi oy avansiga o'tkazildi`,
        );
      } else {
        toast.success("To'lov yozildi");
      }
      options.onSuccess?.(data, vars, ctx);
    },
    onError: makeErr(options),
  });
};

export const useRemovePayoutMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payoutId) =>
      salariesAPI.removePayout(payoutId).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.salaries.all() });
      toast.success("O'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: makeErr(options),
  });
};
