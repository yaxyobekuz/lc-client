import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { teacherSalaryAPI } from "../api/teacherSalary.api";

const useSalaryConfigsQuery = (params, options = {}) =>
  useQuery({
    queryKey: qk.teacherSalary.configs(params),
    queryFn: () => teacherSalaryAPI.configs(params).then((r) => r.data.data),
    ...options,
  });

export default useSalaryConfigsQuery;
