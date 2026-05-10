import { useQuery } from "@tanstack/react-query";
import { paymentsAPI } from "../api/payments.api";
import { qk } from "@/shared/lib/query/keys";

const usePaymentsQuery = (params) =>
  useQuery({
    queryKey: qk.payments.list(params),
    queryFn: () => paymentsAPI.list(params).then((r) => r.data),
  });

export default usePaymentsQuery;
