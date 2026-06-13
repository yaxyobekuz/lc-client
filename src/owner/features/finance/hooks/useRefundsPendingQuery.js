import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { financeAPI } from "../api/finance.api";

const useRefundsPendingQuery = (params, options = {}) =>
  useQuery({
    queryKey: qk.finance.refundsPending(params),
    queryFn: () => financeAPI.refundsPending(params).then((r) => r.data),
    ...options,
  });

export default useRefundsPendingQuery;
