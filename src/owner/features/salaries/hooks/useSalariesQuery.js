import { useQuery } from "@tanstack/react-query";
import { salariesAPI } from "../api/salaries.api";
import { qk } from "@/shared/lib/query/keys";

const useSalariesQuery = (params) =>
  useQuery({
    queryKey: qk.salaries.list(params),
    queryFn: () => salariesAPI.list(params).then((r) => r.data),
  });

export default useSalariesQuery;
