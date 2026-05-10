import { useQuery } from "@tanstack/react-query";
import { salariesAPI } from "../api/salaries.api";
import { qk } from "@/shared/lib/query/keys";

const useSalaryDetailQuery = (id) =>
  useQuery({
    queryKey: qk.salaries.one(id),
    queryFn: () => salariesAPI.byId(id).then((r) => r.data.data),
    enabled: !!id,
  });

export default useSalaryDetailQuery;
