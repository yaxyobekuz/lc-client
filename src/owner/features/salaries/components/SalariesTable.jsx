import { Link } from "react-router-dom";
import SalaryStatusBadge from "@/shared/components/salary/SalaryStatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_LABELS } from "@/shared/constants/salary";

const SalariesTable = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Maoshlar topilmadi
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-3 py-2">O'qituvchi</th>
            <th className="px-3 py-2">Davr</th>
            <th className="px-3 py-2 text-right">Yakuniy</th>
            <th className="px-3 py-2 text-right">To'langan</th>
            <th className="px-3 py-2 text-right">Qoldiq</th>
            <th className="px-3 py-2">Holat</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => {
            const remaining = Math.max(
              0,
              (s.finalAmount || 0) - (s.paidAmount || 0),
            );
            return (
              <tr key={s._id} className="border-t">
                <td className="px-3 py-2">
                  {s.teacher
                    ? `${s.teacher.firstName} ${s.teacher.lastName}`
                    : "—"}
                </td>
                <td className="px-3 py-2">
                  {MONTH_LABELS[s.period.month - 1]} {s.period.year}
                </td>
                <td className="px-3 py-2 text-right font-medium">
                  {formatMoney(s.finalAmount)}
                </td>
                <td className="px-3 py-2 text-right text-green-700">
                  {formatMoney(s.paidAmount)}
                </td>
                <td className="px-3 py-2 text-right text-amber-700">
                  {formatMoney(remaining)}
                </td>
                <td className="px-3 py-2">
                  <SalaryStatusBadge status={s.status} />
                </td>
                <td className="px-3 py-2 text-right">
                  <Link
                    to={`/owner/salaries/${s._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Ochish
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalariesTable;
