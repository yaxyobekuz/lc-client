import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { qk } from "@/shared/lib/query/keys";
import { apiErrorToast } from "@/shared/utils/apiError";
import { onboardingAPI } from "../api/onboarding.api";

// Import guruh + o'quvchilar + moliyaga ta'sir qiladi → barchasini invalidate
// qilamiz (yangi guruh ro'yxatda, to'lovlar hisobotda darhol ko'rinsin).
export const useImportMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => onboardingAPI.import(body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.groups.all() });
      qc.invalidateQueries({ queryKey: qk.users.all() });
      qc.invalidateQueries({ queryKey: qk.students.all() });
      qc.invalidateQueries({ queryKey: qk.finance.all() });
      if (data?.duplicate) {
        toast.info("Bu import allaqachon bajarilgan edi");
      } else {
        toast.success("Tarixiy ma'lumot muvaffaqiyatli import qilindi");
      }
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useImportMutation;
