import { Link } from "react-router-dom";
import Badge from "@/shared/components/ui/badge/Badge";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatPhone } from "@/shared/utils/formatPhone";

const DebtorsTable = ({ items = [] }) => {
  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Qarzdorlar yo'q
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 font-medium text-left w-12">#</th>
            <th className="px-4 py-2 font-medium text-left">Talaba</th>
            <th className="px-4 py-2 font-medium text-left">Telefon</th>
            <th className="px-4 py-2 font-medium text-left w-28">Hisoblar</th>
            <th className="px-4 py-2 font-medium text-left w-40">Qarz</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d, i) => (
            <tr key={d.studentId} className="border-t">
              <td className="px-4 py-2 text-left text-muted-foreground">
                {i + 1}
              </td>
              <td className="px-4 py-2 text-left">
                <Link
                  to={`/owner/users/${d.studentId}`}
                  className="font-medium hover:underline"
                >
                  {d.firstName} {d.lastName}
                </Link>
              </td>
              <td className="px-4 py-2 text-left text-muted-foreground">
                {formatPhone(d.phone) || "-"}
              </td>
              <td className="px-4 py-2 text-left">
                <Badge variant="outline">{d.invoicesCount}</Badge>
              </td>
              <td className="px-4 py-2 text-left font-medium text-rose-500">
                {formatMoney(d.debt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtorsTable;
