import { useNavigate } from "react-router-dom";
import { formatMoney } from "@/shared/utils/formatMoney";
import { cn } from "@/shared/utils/cn";

const TeacherReportTable = ({ items = [] }) => {
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <div className="rounded-md border p-8 text-center text-muted-foreground">
        Bu davr uchun hisoblangan oyliklar yo'q
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="text-left">
          <tr>
            <th className="px-3 py-2 w-10">#</th>
            <th className="px-3 py-2">O'qituvchi</th>
            <th className="px-3 py-2 text-right">Guruh</th>
            <th className="px-3 py-2 text-right">Haftalik soat</th>
            <th className="px-3 py-2 text-right">O'quvchi</th>
            <th className="px-3 py-2 text-right">Kelmagan kun</th>
            <th className="px-3 py-2 text-right">Bonus</th>
            <th className="px-3 py-2 text-right">Jarima</th>
            <th className="px-3 py-2 text-right">Yakuniy</th>
            <th className="px-3 py-2 text-right">To'langan</th>
            <th className="px-3 py-2 text-right">Qoldiq</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t, i) => (
            <tr
              key={t.salaryId}
              onClick={() => navigate(`/owner/salaries/${t.salaryId}`)}
              className="border-t cursor-pointer transition hover:bg-accent/50"
            >
              <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-3 py-2 font-medium">
                {t.firstName} {t.lastName}
              </td>
              <td className="px-3 py-2 text-right">{t.groupsCount}</td>
              <td className="px-3 py-2 text-right">{t.weeklyHours} soat</td>
              <td className="px-3 py-2 text-right">{t.studentsCount}</td>
              <td
                className={cn(
                  "px-3 py-2 text-right",
                  t.absentDays > 0 ? "text-red-600 font-medium" : "text-muted-foreground",
                )}
              >
                {t.absentDays > 0 ? t.absentDays : "—"}
              </td>
              <td className="px-3 py-2 text-right text-green-700">
                {t.bonusTotal > 0 ? `+${formatMoney(t.bonusTotal)}` : "—"}
              </td>
              <td className="px-3 py-2 text-right text-red-700">
                {t.penaltyTotal > 0 ? `−${formatMoney(t.penaltyTotal)}` : "—"}
              </td>
              <td className="px-3 py-2 text-right font-medium">
                {formatMoney(t.finalAmount)}
              </td>
              <td className="px-3 py-2 text-right text-green-700">
                {formatMoney(t.paidAmount)}
              </td>
              <td className="px-3 py-2 text-right text-amber-700">
                {formatMoney(t.remaining)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherReportTable;
