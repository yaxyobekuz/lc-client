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
    <div className="border rounded-sm overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">#</th>
            <th className="px-4 py-2 font-medium">Talaba</th>
            <th className="px-4 py-2 font-medium">Telefon</th>
            <th className="px-4 py-2 font-medium">Hisoblar</th>
            <th className="px-4 py-2 font-medium">Qarz</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d, i) => (
            <tr key={d.studentId} className="border-t">
              <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/owner/users/${d.studentId}`}
                  className="font-medium hover:underline"
                >
                  {d.firstName} {d.lastName}
                </Link>
              </td>
              <td className="px-4 py-2 text-muted-foreground">
                {formatPhone(d.phone) || "-"}
              </td>
              <td className="px-4 py-2">
                <Badge variant="outline">{d.invoicesCount}</Badge>
              </td>
              <td className="px-4 py-2 font-medium text-red-600">
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
