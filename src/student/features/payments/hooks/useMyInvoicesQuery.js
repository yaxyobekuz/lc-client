import { useQuery } from "@tanstack/react-query";
import { studentPaymentsAPI } from "../api/studentPayments.api";
import { qk } from "@/shared/lib/query/keys";

const useMyInvoicesQuery = (studentId) =>
  useQuery({
    queryKey: qk.invoices.byStudent(studentId),
    queryFn: () => studentPaymentsAPI.invoices(studentId).then((r) => r.data),
    enabled: !!studentId,
  });

export default useMyInvoicesQuery;
