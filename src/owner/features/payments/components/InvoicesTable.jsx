import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import InvoiceStatusBadge from "./InvoiceStatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";

const formatPeriod = (p) => {
  if (!p) return "-";
  return `${String(p.month).padStart(2, "0")}.${p.year}`;
};

// onPay(invoice) berilsa — har bir qatorga "To'landi qilib belgilash" tugmasi
const InvoicesTable = ({ items = [], showStudent = true, onPay }) => {
  const payable = typeof onPay === "function";
  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Hisoblar topilmadi
      </div>
    );
  }

  // Ustun kengliklari - To'lovlar jadvali bilan bir xil chegaralarga tushadi
  const w = showStudent
    ? {
        davr: "10%",
        talaba: "16%",
        guruh: "16%",
        jami: "12%",
        tolangan: "12%",
        qoldiq: "12%",
        muddat: "10%",
        holat: "12%",
      }
    : {
        davr: "12%",
        guruh: "18%",
        jami: "14%",
        tolangan: "14%",
        qoldiq: "14%",
        muddat: "13%",
        holat: "15%",
      };

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm table-fixed">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-3 font-medium" style={{ width: w.davr }}>
              Davr
            </th>
            {showStudent && (
              <th className="px-4 py-3 font-medium" style={{ width: w.talaba }}>
                Talaba
              </th>
            )}
            <th className="px-4 py-3 font-medium" style={{ width: w.guruh }}>
              Guruh
            </th>
            <th
              className="px-4 py-3 font-medium text-right"
              style={{ width: w.jami }}
            >
              Jami
            </th>
            <th
              className="px-4 py-3 font-medium text-right"
              style={{ width: w.tolangan }}
            >
              To'langan
            </th>
            <th
              className="px-4 py-3 font-medium text-right"
              style={{ width: w.qoldiq }}
            >
              Qoldiq
            </th>
            <th className="px-4 py-3 font-medium" style={{ width: w.muddat }}>
              Muddat
            </th>
            <th className="px-4 py-3 font-medium" style={{ width: w.holat }}>
              Holat
            </th>
            {payable && (
              <th className="px-4 py-3 font-medium text-right">Amallar</th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((inv) => {
            const remaining = Math.max(0, (inv.totalDue || 0) - (inv.paidAmount || 0));
            return (
              <tr key={inv._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link
                    to={`/owner/payments/invoices/${inv._id}`}
                    className="font-medium hover:underline"
                  >
                    {formatPeriod(inv.period)}
                  </Link>
                </td>
                {showStudent && (
                  <td className="px-4 py-3 truncate">
                    {inv.student?.firstName} {inv.student?.lastName}
                  </td>
                )}
                <td className="px-4 py-3 truncate">{inv.group?.name || "-"}</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatMoney(inv.totalDue)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatMoney(inv.paidAmount)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-medium">
                  {formatMoney(remaining)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDateUz(inv.dueDate)}
                </td>
                <td className="px-4 py-3">
                  <InvoiceStatusBadge status={inv.status} />
                </td>
                {payable && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      {inv.status === "paid" ? (
                        <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                          <Check className="size-3.5" />
                          To'landi
                        </span>
                      ) : inv.status === "cancelled" ? (
                        <span className="text-gray-300">—</span>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          title="To'liq summani to'langan deb belgilash"
                          className="border-emerald-200 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                          onClick={() => onPay(inv)}
                          playClickSound={false}
                        >
                          <Check className="size-3.5" />
                          To'landi qilib belgilash
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
