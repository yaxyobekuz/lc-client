import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { adminDashboardAPI } from "../api/adminDashboard.api";

const useMonthlyFinancialsQuery = (params) =>
  useQuery({
    queryKey: qk.adminDashboard.monthlyFinancials(params),
    queryFn: () =>
      adminDashboardAPI.monthlyFinancials(params).then((r) => r.data.data),
  });

export default useMonthlyFinancialsQuery;
