import { useQuery } from "@tanstack/react-query";
import { discountsAPI } from "../api/discounts.api";
import { qk } from "@/shared/lib/query/keys";

const useStudentDiscountsQuery = (studentId) =>
  useQuery({
    queryKey: qk.discounts.byStudent(studentId),
    queryFn: () =>
      discountsAPI.list({ studentId, limit: 100 }).then((r) => r.data),
    enabled: !!studentId,
  });

export default useStudentDiscountsQuery;
