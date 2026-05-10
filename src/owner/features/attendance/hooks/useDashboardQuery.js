import { useQuery } from "@tanstack/react-query";
import { attendanceAPI } from "../api/attendance.api";
import { qk } from "@/shared/lib/query/keys";

const useDashboardQuery = (range) =>
  useQuery({
    queryKey: qk.attendance.dashboard(range),
    queryFn: () => attendanceAPI.dashboard(range).then((r) => r.data.data),
    enabled: !!range?.fromDate && !!range?.toDate,
  });

export default useDashboardQuery;
