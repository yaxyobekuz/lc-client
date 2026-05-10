import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { leadsAPI } from "../api/leads.api";
import { qk } from "@/shared/lib/query/keys";

const handleErr = (err) =>
  toast.error(err?.response?.data?.message || "Xatolik yuz berdi");

const useInvalidateAll = () => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: qk.leads.all() });
};

export const useLeadCreateMutation = (options = {}) => {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (body) => leadsAPI.create(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("Lid yaratildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useLeadUpdateMutation = (options = {}) => {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: ({ id, ...body }) =>
      leadsAPI.update(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("Saqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useLeadDeleteMutation = (options = {}) => {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (id) => leadsAPI.remove(id).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("O'chirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useChangeStatusMutation = (options = {}) => {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: ({ id, statusId, message }) =>
      leadsAPI
        .changeStatus(id, { statusId, message })
        .then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("Status o'zgardi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useAddNoteMutation = (options = {}) => {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: ({ id, message }) =>
      leadsAPI.addNote(id, { message }).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("Eslatma qo'shildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useRecordContactMutation = (options = {}) => {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: ({ id, message }) =>
      leadsAPI.recordContact(id, { message }).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("Bog'lanish qayd qilindi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useSetFollowUpMutation = (options = {}) => {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: ({ id, date, note }) =>
      leadsAPI.setFollowUp(id, { date, note }).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("Eslatma sozlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useSetTrialMutation = (options = {}) => {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: ({ id, date, groupId }) =>
      leadsAPI.setTrial(id, { date, groupId }).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("Sinov darsi sozlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};

export const useConvertMutation = (options = {}) => {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: ({ id, ...body }) =>
      leadsAPI.convert(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      invalidate();
      toast.success("O'quvchiga aylantirildi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: handleErr,
  });
};
