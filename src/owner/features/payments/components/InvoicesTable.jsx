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

// onPay(invoice) berilsa — har bir qatorga "To'lash" tugmasi
// onRowClick(invoice) berilsa — qator bosilganda chaqiriladi (masalan to'lov tafsilotlari modali)
const InvoicesTable = ({ items = [], showStudent = true, onPay, onRowClick }) => {
  const payable = typeof onPay === "function";
  const clickable = typeof onRowClick === "function";
  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Hisoblar topilmadi
      </div>
    );
  }

  // Ustun kengliklari - amal ustuni bo'lsa unga ham joy ajratiladi, jami 100%
  const w = showStudent
    ? {
        davr: payable ? "9%" : "11%",
        talaba: payable ? "16%" : "18%",
        guruh: payable ? "15%" : "18%",
        due: payable ? "13%" : "14%",
        tolangan: payable ? "13%" : "14%",
        muddat: payable ? "11%" : "12%",
        holat: payable ? "11%" : "13%",
        amallar: "12%",
      }
    : {
        davr: payable ? "10%" : "13%",
        guruh: payable ? "18%" : "22%",
        due: payable ? "15%" : "18%",
        tolangan: payable ? "15%" : "18%",
        muddat: payable ? "12%" : "14%",
        holat: payable ? "12%" : "15%",
        amallar: "18%",
      };

  // Qatordagi ichki link/tugma bosilganda qator onClick'i ishlamasligi uchun
  const stop = (e) => e.stopPropagation();

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
                O'quvchi
              </th>
            )}
            <th className="px-4 py-3 font-medium" style={{ width: w.guruh }}>
              Guruh
            </th>
            <th
              className="px-4 py-3 font-medium text-right"
              style={{ width: w.due }}
            >
              To'lanishi kerak
            </th>
            <th
              className="px-4 py-3 font-medium text-right"
              style={{ width: w.tolangan }}
            >
              To'langan
            </th>
            <th className="px-4 py-3 font-medium" style={{ width: w.muddat }}>
              Muddat
            </th>
            <th className="px-4 py-3 font-medium" style={{ width: w.holat }}>
              Holat
            </th>
            {payable && (
              <th
                className="px-4 py-3 font-medium text-right"
                style={{ width: w.amallar }}
              >
                Amallar
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((inv) => (
            <tr
              key={inv._id}
              className={`hover:bg-gray-50 ${clickable ? "cursor-pointer" : ""}`}
              onClick={clickable ? () => onRowClick(inv) : undefined}
            >
              <td className="px-4 py-3">
                <Link
                  to={`/owner/payments/invoices/${inv._id}`}
                  className="font-medium hover:underline"
                  onClick={stop}
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
                        className="whitespace-nowrap border-emerald-200 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                        onClick={(e) => {
                          stop(e);
                          onPay(inv);
                        }}
                        playClickSound={false}
                      >
                        <Check className="size-3.5" />
                        To'lash
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
