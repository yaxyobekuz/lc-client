import { useQuery } from "@tanstack/react-query";
import { attendanceAPI } from "../api/attendance.api";
import { qk } from "@/shared/lib/query/keys";

// Korrelatsiya ma'lumotlari bir oy ichida deyarli o'zgarmaydi.
// 10 min staleTime → bir foydalanuvchi sahifaga qaytsa cache'dan instantly olinadi.
const useCorrelationQuery = ({ year, month } = {}) =>
  useQuery({
    queryKey: qk.attendance.correlation({ year, month }),
    queryFn: () =>
      attendanceAPI.correlation({ year, month }).then((r) => r.data.data),
    enabled: !!year && !!month,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

export default useCorrelationQuery;
