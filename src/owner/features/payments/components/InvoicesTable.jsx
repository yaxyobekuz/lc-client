import { Link } from "react-router-dom";
import InvoiceStatusBadge from "./InvoiceStatusBadge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";

const formatPeriod = (p) => {
  if (!p) return "-";
  return `${String(p.month).padStart(2, "0")}.${p.year}`;
};

const InvoicesTable = ({ items = [], showStudent = true }) => {
  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Hisoblar topilmadi
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Davr</th>
            {showStudent && <th className="px-4 py-2 font-medium">Talaba</th>}
            <th className="px-4 py-2 font-medium">Guruh</th>
            <th className="px-4 py-2 font-medium">Jami</th>
            <th className="px-4 py-2 font-medium">To'langan</th>
            <th className="px-4 py-2 font-medium">Qoldiq</th>
            <th className="px-4 py-2 font-medium">Muddat</th>
            <th className="px-4 py-2 font-medium">Holat</th>
          </tr>
        </thead>
        <tbody>
          {items.map((inv) => {
            const remaining = Math.max(0, (inv.totalDue || 0) - (inv.paidAmount || 0));
            return (
              <tr key={inv._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <Link
                    to={`/owner/payments/invoices/${inv._id}`}
                    className="font-medium hover:underline"
                  >
                    {formatPeriod(inv.period)}
                  </Link>
                </td>
                {showStudent && (
                  <td className="px-4 py-2">
                    {inv.student?.firstName} {inv.student?.lastName}
                  </td>
                )}
                <td className="px-4 py-2">{inv.group?.name || "-"}</td>
                <td className="px-4 py-2">{formatMoney(inv.totalDue)}</td>
                <td className="px-4 py-2">{formatMoney(inv.paidAmount)}</td>
                <td className="px-4 py-2 font-medium">{formatMoney(remaining)}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {formatDateUz(inv.dueDate)}
                </td>
                <td className="px-4 py-2">
                  <InvoiceStatusBadge status={inv.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
