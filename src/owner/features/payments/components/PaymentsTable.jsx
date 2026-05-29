import { Receipt, Undo2 } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";

const PaymentsTable = ({ items = [], showStudent = true, showActions = true }) => {
  const { openModal } = useModal();

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        To'lovlar yo'q
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Sana</th>
            {showStudent && <th className="px-4 py-2 font-medium">Talaba</th>}
            <th className="px-4 py-2 font-medium">Summa</th>
            <th className="px-4 py-2 font-medium">Turi</th>
            <th className="px-4 py-2 font-medium">Usul</th>
            <th className="px-4 py-2 font-medium">Qabul qilgan</th>
            {showActions && <th className="px-4 py-2 font-medium text-right">Amallar</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="px-4 py-2">{formatDateUz(p.paidAt)}</td>
              {showStudent && (
                <td className="px-4 py-2">
                  {p.student?.firstName} {p.student?.lastName}
                </td>
              )}
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
              <td className="px-4 py-2">{p.method?.name || "-"}</td>
              <td className="px-4 py-2 text-muted-foreground">
                {p.receivedBy
                  ? `${p.receivedBy.firstName} ${p.receivedBy.lastName}`
                  : "-"}
              </td>
              {showActions && (
                <td className="px-4 py-2">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={`/owner/payments/receipt/${p._id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100"
                      title="Chek chiqarish"
                    >
                      <Receipt className="size-4" />
                    </a>
                    {p.type === "payment" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() =>
                          openModal(MODAL.PAYMENT_REFUND, { payment: p })
                        }
                        playClickSound={false}
                        title="Qaytarish"
                      >
                        <Undo2 className="size-4" />
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

export default PaymentsTable;
