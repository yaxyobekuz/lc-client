import { useQuery } from "@tanstack/react-query";
import { salariesAPI } from "../api/salaries.api";
import { qk } from "@/shared/lib/query/keys";

const useSalaryPayoutsQuery = (id) =>
  useQuery({
    queryKey: qk.salaries.payouts(id),
    queryFn: () => salariesAPI.payouts(id).then((r) => r.data.data),
    enabled: !!id,
  });

export default useSalaryPayoutsQuery;
