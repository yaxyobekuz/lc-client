import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { financeAPI } from "../api/finance.api";

const useRefundsHistoryQuery = (params, options = {}) =>
  useQuery({
    queryKey: qk.finance.refundsHistory(params),
    queryFn: () => financeAPI.refundsHistory(params).then((r) => r.data),
    ...options,
  });

export default useRefundsHistoryQuery;
