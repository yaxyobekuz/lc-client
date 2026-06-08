// TanStack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiErrorToast } from "@/shared/utils/apiError";

// Sonner
import { toast } from "sonner";

// API
import { groupsAPI } from "../api/groups.api";

// Query keys
import { qk } from "@/shared/lib/query/keys";

const useGroupUpdateMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) =>
      groupsAPI.update(id, body).then((r) => r.data.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.groups.all() });
      qc.invalidateQueries({ queryKey: qk.groups.one(vars.id) });
      // Narx siyosati joriy oy hisoblarini o'zgartirgan bo'lishi mumkin
      qc.invalidateQueries({ queryKey: qk.invoices.all() });
      const pc = data?.priceChange;
      if (pc && pc.repriced > 0) {
        const extra =
          pc.newDebtCount > 0
            ? ` (${pc.newDebtCount} ta to'langan hisobga farq qarz yozildi)`
            : "";
        toast.success(
          `Saqlandi — joriy oy uchun ${pc.repriced} ta hisob yangi narxga moslandi${extra}`,
        );
      } else {
        toast.success("Saqlandi");
      }
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      apiErrorToast(err);
      options.onError?.(err);
    },
  });
};

export default useGroupUpdateMutation;
