import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { attendanceAPI } from "../api/attendance.api";
import { qk } from "@/shared/lib/query/keys";

const useBulkRecordMutation = (options = {}) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId, date, items }) =>
      attendanceAPI.bulkRecord(groupId, { date, items }).then((r) => r.data),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: qk.attendance.all() });
      toast.success("Davomat saqlandi");
      options.onSuccess?.(data, vars, ctx);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      options.onError?.(err);
    },
  });
};

export default useBulkRecordMutation;
