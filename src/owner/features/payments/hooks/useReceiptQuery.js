import { useQuery } from "@tanstack/react-query";
import { paymentsAPI } from "../api/payments.api";
import { qk } from "@/shared/lib/query/keys";

const useReceiptQuery = (id) =>
  useQuery({
    queryKey: qk.payments.receipt(id),
    queryFn: () => paymentsAPI.receipt(id).then((r) => r.data.data),
    enabled: !!id,
  });

export default useReceiptQuery;
