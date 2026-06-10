import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { financeAPI } from "../api/finance.api";

const useFinanceReportQuery = (params, options = {}) =>
  useQuery({
    queryKey: qk.finance.report(params),
    queryFn: () => financeAPI.reportMonthly(params).then((r) => r.data.data),
    enabled: !!params?.year && !!params?.month,
    ...options,
  });

export default useFinanceReportQuery;
