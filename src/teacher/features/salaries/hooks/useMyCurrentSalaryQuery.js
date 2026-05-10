import { useQuery } from "@tanstack/react-query";
import { teacherSalariesAPI } from "../api/salaries.api";
import { qk } from "@/shared/lib/query/keys";

const useMyCurrentSalaryQuery = () =>
  useQuery({
    queryKey: qk.salaries.myCurrent(),
    queryFn: () => teacherSalariesAPI.myCurrent().then((r) => r.data.data),
  });

export default useMyCurrentSalaryQuery;
