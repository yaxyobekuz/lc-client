import { useQuery } from "@tanstack/react-query";
import { teacherGroupRatesAPI } from "../api/teacherGroupRates.api";
import { qk } from "@/shared/lib/query/keys";

const useTeacherGroupRatesQuery = (params) =>
  useQuery({
    queryKey: qk.teacherGroupRates.list(params),
    queryFn: () => teacherGroupRatesAPI.list(params).then((r) => r.data),
  });

export default useTeacherGroupRatesQuery;
