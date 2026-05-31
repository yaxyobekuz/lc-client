import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { salariesAPI } from "../api/salaries.api";

const useSalaryTeacherReportQuery = (params) =>
  useQuery({
    queryKey: qk.salaries.dashboardTeachers(params),
    queryFn: () => salariesAPI.dashboardTeachers(params).then((r) => r.data.data),
  });

export default useSalaryTeacherReportQuery;
