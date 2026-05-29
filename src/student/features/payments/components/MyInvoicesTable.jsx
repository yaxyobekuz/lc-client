import Badge from "@/shared/components/ui/badge/Badge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";

const STATUS_LABEL = {
  unpaid: "To'lanmagan",
  partial: "Qisman",
  paid: "To'langan",
  cancelled: "Bekor qilingan",
};

const STATUS_CLASS = {
  unpaid: "bg-red-100 text-red-700",
  partial: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

const formatPeriod = (p) => {
  if (!p) return "-";
  return `${String(p.month).padStart(2, "0")}.${p.year}`;
};

const MyInvoicesTable = ({ items = [] }) => {
  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Hisoblar yo'q
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Davr</th>
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
              <tr key={inv._id} className="border-t">
                <td className="px-4 py-2 font-medium">{formatPeriod(inv.period)}</td>
                <td className="px-4 py-2">{inv.group?.name || "-"}</td>
                <td className="px-4 py-2">{formatMoney(inv.totalDue)}</td>
                <td className="px-4 py-2">{formatMoney(inv.paidAmount)}</td>
                <td className="px-4 py-2 font-medium">{formatMoney(remaining)}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {formatDateUz(inv.dueDate)}
                </td>
                <td className="px-4 py-2">
                  <Badge className={STATUS_CLASS[inv.status] || ""}>
                    {STATUS_LABEL[inv.status] || inv.status}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyInvoicesTable;
