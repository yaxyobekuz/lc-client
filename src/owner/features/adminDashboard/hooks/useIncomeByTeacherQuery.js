import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { adminDashboardAPI } from "../api/adminDashboard.api";

const useIncomeByTeacherQuery = (params) =>
  useQuery({
    queryKey: qk.adminDashboard.incomeByTeacher(params),
    queryFn: () =>
      adminDashboardAPI.incomeByTeacher(params).then((r) => r.data.data),
  });

export default useIncomeByTeacherQuery;
