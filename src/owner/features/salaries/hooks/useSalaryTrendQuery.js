import { useQuery } from "@tanstack/react-query";
import { salariesAPI } from "../api/salaries.api";
import { qk } from "@/shared/lib/query/keys";

const useSalaryTrendQuery = (params = { months: 6 }) =>
  useQuery({
    queryKey: qk.salaries.trend(params),
    queryFn: () => salariesAPI.trend(params).then((r) => r.data.data),
  });

export default useSalaryTrendQuery;
