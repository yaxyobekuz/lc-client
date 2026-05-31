// Router
import { Link } from "react-router-dom";

// Icons
import { Check } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import { InvoiceStatusBadge } from "@/owner/features/payments";

// Hooks
import useModal from "@/shared/hooks/useModal";

// Constants
import { MODAL } from "@/shared/constants/modals";

// Utils
import { formatMoney } from "@/shared/utils/formatMoney";

// Qarzi ko'p bo'lganlar tepada; keyin ism bo'yicha
const sortByDebt = (a, b) => {
  const da = Math.max(0, (a.totalDue || 0) - (a.paidAmount || 0));
  const db = Math.max(0, (b.totalDue || 0) - (b.paidAmount || 0));
  if (db !== da) return db - da;
  const an = `${a.student?.firstName || ""} ${a.student?.lastName || ""}`;
  const bn = `${b.student?.firstName || ""} ${b.student?.lastName || ""}`;
  return an.localeCompare(bn);
};

const Empty = () => <span className="text-gray-300">—</span>;

const GroupPaymentsBreakdownTable = ({ items = [] }) => {
  const { openModal } = useModal();

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-muted-foreground">
        Bu oy uchun hisoblar topilmadi
      </div>
    );
  }

  const rows = [...items].sort(sortByDebt);

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
      <table className="w-full min-w-[760px] table-fixed text-sm">
        <colgroup>
          <col className="w-12" />
          <col className="w-[18%]" />
          <col className="w-[11%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[13%]" />
          <col className="w-[22%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-400">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">O'quvchi</th>
            <th className="px-4 py-3 text-right">Chegirma</th>
            <th className="px-4 py-3 text-right">To'lov</th>
            <th className="px-4 py-3 text-right">To'langan</th>
            <th className="px-4 py-3 text-right">Qarz</th>
            <th className="px-4 py-3">Holat</th>
            <th className="px-4 py-3 text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((inv, i) => {
            const debt = Math.max(0, (inv.totalDue || 0) - (inv.paidAmount || 0));
            const studentId = inv.student?._id || inv.student;
            const name =
              `${inv.student?.firstName || ""} ${inv.student?.lastName || ""}`.trim() ||
              inv.student?.username ||
              "-";
            return (
              <tr key={inv._id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link
                    to={`/owner/users/${studentId}`}
                    className="block truncate font-medium text-sky-700 hover:text-sky-800 hover:underline"
                    title={name}
                  >
                    {name}
                  </Link>
                  {inv.student?.balance > 0 && (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
                      Balans: {formatMoney(inv.student.balance)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-amber-600">
                  {inv.discountAmount ? formatMoney(inv.discountAmount) : <Empty />}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-700">
                  {formatMoney(inv.totalDue)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-green-600">
                  {formatMoney(inv.paidAmount)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-medium">
                  {debt ? (
                    <span className="text-rose-500">{formatMoney(debt)}</span>
                  ) : (
                    <Empty />
                  )}
                </td>
                <td className="px-4 py-3">
                  <InvoiceStatusBadge status={inv.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    {inv.status === "paid" ? (
                      <span className="inline-flex items-center gap-1 font-medium text-green-600">
                        <Check className="size-3.5" />
                        To'landi
                      </span>
                    ) : inv.status === "cancelled" ? (
                      <Empty />
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        title="To'liq summani to'langan deb belgilash"
                        className="border-green-200 text-green-700 hover:border-green-300 hover:bg-green-50 hover:text-green-800"
                        onClick={() =>
                          openModal(MODAL.PAYMENT_RECORD, { invoice: inv })
                        }
                        playClickSound={false}
                      >
                        <Check className="size-3.5" />
                        To'lash
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GroupPaymentsBreakdownTable;
