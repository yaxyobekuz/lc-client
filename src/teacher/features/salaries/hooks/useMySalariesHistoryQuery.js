import { useQuery } from "@tanstack/react-query";
import { teacherSalariesAPI } from "../api/salaries.api";
import { qk } from "@/shared/lib/query/keys";

const useMySalariesHistoryQuery = (params) =>
  useQuery({
    queryKey: qk.salaries.myHistory(params),
    queryFn: () => teacherSalariesAPI.myHistory(params).then((r) => r.data),
  });

export default useMySalariesHistoryQuery;
