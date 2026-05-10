import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { adminDashboardAPI } from "../api/adminDashboard.api";

const useForecastQuery = () =>
  useQuery({
    queryKey: qk.adminDashboard.forecast(),
    queryFn: () => adminDashboardAPI.forecast().then((r) => r.data.data),
  });

export default useForecastQuery;
