import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/ui/button/Button";
import SalaryStatusBadge from "@/shared/components/salary/SalaryStatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_LABELS } from "@/shared/constants/salary";

// Paid/cancelled bo'lmagan oylikni to'lash mumkin
const isPayable = (s) => s.status !== "paid" && s.status !== "cancelled";

const SalariesTable = ({
  items = [],
  selectedIds = [],
  onToggle,
  onToggleAll,
  allSelected = false,
  someSelected = false,
  onPay,
}) => {
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Maoshlar topilmadi
      </div>
    );
  }

  const selected = new Set(selectedIds);

  return (
    <div className="overflow-x-auto rounded-sm border">
      <table className="w-full text-sm">
        <thead className="text-left">
          <tr>
            <th className="px-3 py-2 w-10">
              <input
                type="checkbox"
                className="size-4 cursor-pointer accent-primary"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected && !allSelected;
                }}
                onChange={() => onToggleAll?.()}
                title="Hammasini tanlash"
              />
            </th>
            <th className="px-3 py-2">O'qituvchi</th>
            <th className="px-3 py-2">Davr</th>
            <th className="px-3 py-2 text-right">Yakuniy</th>
            <th className="px-3 py-2 text-right">To'langan</th>
            <th className="px-3 py-2 text-right">Qoldiq</th>
            <th className="px-3 py-2">Holat</th>
            <th className="px-3 py-2 text-right">Amal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => {
            const remaining = Math.max(
              0,
              (s.finalAmount || 0) - (s.paidAmount || 0),
            );
            const payable = isPayable(s);
            return (
              <tr
                key={s._id}
                onClick={() => navigate(`/owner/salaries/${s._id}`)}
                className="border-t cursor-pointer transition hover:bg-accent/50"
              >
                <td
                  className="px-3 py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="size-4 cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-40"
                    checked={selected.has(s._id)}
                    disabled={!payable}
                    onChange={() => onToggle?.(s._id)}
                  />
                </td>
                <td className="px-3 py-2">
                  {s.teacher
                    ? `${s.teacher.firstName} ${s.teacher.lastName}`
                    : "-"}
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
                <td
                  className="px-3 py-2 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  {payable ? (
                    <Button
                      size="sm"
                      onClick={() => onPay?.(s)}
                      playClickSound={false}
                    >
                      To'lov qilish
                    </Button>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
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
