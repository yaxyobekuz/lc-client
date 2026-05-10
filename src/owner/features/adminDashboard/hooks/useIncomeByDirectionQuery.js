import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { adminDashboardAPI } from "../api/adminDashboard.api";

const useIncomeByDirectionQuery = (params) =>
  useQuery({
    queryKey: qk.adminDashboard.incomeByDirection(params),
    queryFn: () =>
      adminDashboardAPI.incomeByDirection(params).then((r) => r.data.data),
  });

export default useIncomeByDirectionQuery;
