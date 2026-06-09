import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatPhone } from "@/shared/utils/formatPhone";

// onPay(debtor) berilsa — har bir qatorda "To'lash" tugmasi chiqadi.
// payingId — hozir yuklanayotgan qarzdor (spinner ko'rsatish uchun).
const DebtorsTable = ({ items = [], onPay, payingId = null }) => {
  const payable = typeof onPay === "function";

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
            <th className="px-4 py-2 font-medium text-left">O'quvchi</th>
            <th className="px-4 py-2 font-medium text-left">Telefon</th>
            <th className="px-4 py-2 font-medium text-left w-28">Hisoblar</th>
            <th className="px-4 py-2 font-medium text-left w-40">Qarz</th>
            {payable && (
              <th className="px-4 py-2 font-medium text-right w-32">Amal</th>
            )}
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
              {payable && (
                <td className="px-4 py-2 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!d.oldestOpenInvoiceId || payingId === d.studentId}
                    onClick={() => onPay(d)}
                    
                  >
                    <Wallet className="size-4" />
                    {payingId === d.studentId ? "..." : "To'lash"}
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtorsTable;
