import { useQuery } from "@tanstack/react-query";
import { attendanceAPI } from "../api/attendance.api";
import { qk } from "@/shared/lib/query/keys";

const useAttendanceForGroupDateQuery = (groupId, date) =>
  useQuery({
    queryKey: qk.attendance.byGroupDate(groupId, date),
    queryFn: () =>
      attendanceAPI.listForGroupDate(groupId, date).then((r) => r.data.data),
    enabled: !!groupId && !!date,
  });

export default useAttendanceForGroupDateQuery;
