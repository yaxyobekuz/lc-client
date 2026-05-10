import Badge from "@/shared/components/ui/badge/Badge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";

const formatPeriod = (p) => {
  if (!p) return "—";
  return `${String(p.month).padStart(2, "0")}.${p.year}`;
};

const MyPaymentsTable = ({ items = [] }) => {
  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        To'lovlar yo'q
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Sana</th>
            <th className="px-4 py-2 font-medium">Davr</th>
            <th className="px-4 py-2 font-medium">Guruh</th>
            <th className="px-4 py-2 font-medium">Summa</th>
            <th className="px-4 py-2 font-medium">Turi</th>
            <th className="px-4 py-2 font-medium">Usul</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="px-4 py-2">{formatDateUz(p.paidAt)}</td>
              <td className="px-4 py-2">{formatPeriod(p.invoice?.period)}</td>
              <td className="px-4 py-2">{p.invoice?.group?.name || "—"}</td>
              <td className="px-4 py-2 font-medium">
                <span className={p.type === "refund" ? "text-red-600" : ""}>
                  {p.type === "refund" ? "−" : ""}
                  {formatMoney(p.amount)}
                </span>
              </td>
              <td className="px-4 py-2">
                {p.type === "refund" ? (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Qaytarilgan
                  </Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-700">To'lov</Badge>
                )}
              </td>
              <td className="px-4 py-2">{p.method?.name || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPaymentsTable;
