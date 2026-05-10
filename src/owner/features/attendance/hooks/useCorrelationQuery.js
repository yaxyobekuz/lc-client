import { useQuery } from "@tanstack/react-query";
import { attendanceAPI } from "../api/attendance.api";
import { qk } from "@/shared/lib/query/keys";

const useCorrelationQuery = ({ year, month } = {}) =>
  useQuery({
    queryKey: qk.attendance.correlation({ year, month }),
    queryFn: () =>
      attendanceAPI.correlation({ year, month }).then((r) => r.data.data),
    enabled: !!year && !!month,
  });

export default useCorrelationQuery;
