import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { teacherSalaryAPI } from "../api/teacherSalary.api";

const useSalaryReportQuery = (params, options = {}) =>
  useQuery({
    queryKey: qk.teacherSalary.report(params),
    queryFn: () => teacherSalaryAPI.reportMonthly(params).then((r) => r.data.data),
    enabled: !!params?.year && !!params?.month,
    ...options,
  });

export default useSalaryReportQuery;
