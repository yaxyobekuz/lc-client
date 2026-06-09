// Icons
import { Wallet, CalendarCheck, Star } from "lucide-react";

// Components
import StatCard from "@/shared/components/ui/card/StatCard";

// Hooks (mavjud davomat va to'lov statistikasi qayta ishlatiladi)
import { useGroupAttendanceSummaryQuery } from "@/owner/features/attendance";
import { useGroupStatsQuery } from "@/owner/features/payments";

// Utils
import { toDateInput } from "@/shared/utils/formatDate";

// Guruh detalining ustki qismidagi qisqa statistika paneli: To'lov, Davomat, Baho.
// Joriy oy bo'yicha. Mavjud StatCard + davomat/to'lov query'lari qayta ishlatiladi.
// Baho (grade) Faza 2'da real o'rtacha ballga ulanadi — hozircha placeholder ("—").
const GroupStatsPanel = ({ groupId }) => {
  const now = new Date();
  const period = { year: now.getFullYear(), month: now.getMonth() + 1 };
  const fromDate = toDateInput(new Date(period.year, period.month - 1, 1));
  const toDate = toDateInput(new Date(period.year, period.month, 0));

  // Davomat — umumiy foiz (groupRate)
  const { data: attData } = useGroupAttendanceSummaryQuery(groupId, {
    fromDate,
    toDate,
  });
  const rate = attData?.aggregate?.groupRate;

  // To'lov — joriy oy yig'ilgan / qarz
  const { data: payStats = [] } = useGroupStatsQuery(period);
  const pay = payStats.find((g) => g.groupId === groupId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <StatCard
        icon={Wallet}
        tone={pay && pay.outstanding > 0 ? "warn" : "positive"}
        label="To'lov (joriy oy)"
        value={pay ? pay.collected : 0}
        isMoney
        hint={
          pay
            ? `Qarz: ${pay.outstanding.toLocaleString("uz-UZ")} so'm`
            : "Hisob-kitob yo'q"
        }
      />
      <StatCard
        icon={CalendarCheck}
        tone={
          rate == null ? "default" : rate >= 75 ? "positive" : rate >= 50 ? "warn" : "negative"
        }
        label="Davomat (joriy oy)"
        value={rate == null ? null : rate}
        suffix="%"
        hint={rate == null ? "Ma'lumot yo'q" : "Umumiy davomat foizi"}
      />
      <StatCard
        icon={Star}
        tone="info"
        label="O'rtacha baho"
        value={null}
        hint="Tez orada (baholash tizimi)"
      />
    </div>
  );
};

export default GroupStatsPanel;
