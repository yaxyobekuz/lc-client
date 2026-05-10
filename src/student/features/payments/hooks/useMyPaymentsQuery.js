import { useQuery } from "@tanstack/react-query";
import { studentPaymentsAPI } from "../api/studentPayments.api";
import { qk } from "@/shared/lib/query/keys";

const useMyPaymentsQuery = (studentId) =>
  useQuery({
    queryKey: qk.payments.byStudent(studentId),
    queryFn: () => studentPaymentsAPI.payments(studentId).then((r) => r.data),
    enabled: !!studentId,
  });

export default useMyPaymentsQuery;
