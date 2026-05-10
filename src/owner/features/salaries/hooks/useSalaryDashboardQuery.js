import { useQuery } from "@tanstack/react-query";
import { salariesAPI } from "../api/salaries.api";
import { qk } from "@/shared/lib/query/keys";

const useSalaryDashboardQuery = (params) =>
  useQuery({
    queryKey: qk.salaries.dashboard(params),
    queryFn: () => salariesAPI.dashboard(params).then((r) => r.data.data),
  });

export default useSalaryDashboardQuery;
