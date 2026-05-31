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

  // Ustun kengliklari - Hisoblar jadvali bilan bir xil chegaralarga tushadi
  const w = showStudent
    ? {
        sana: "11%",
        talaba: "17%",
        summa: "16%",
        turi: "13%",
        usul: "13%",
        qabul: showActions ? "18%" : "30%",
        amallar: "12%",
      }
    : {
        sana: "12%",
        summa: "18%",
        turi: "14%",
        usul: "14%",
        qabul: showActions ? "27%" : "42%",
        amallar: "15%",
      };

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm table-fixed">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-3 font-medium" style={{ width: w.sana }}>
              Sana
            </th>
            {showStudent && (
              <th className="px-4 py-3 font-medium" style={{ width: w.talaba }}>
                O'quvchi
              </th>
            )}
            <th
              className="px-4 py-3 font-medium text-right"
              style={{ width: w.summa }}
            >
              Summa
            </th>
            <th className="px-4 py-3 font-medium" style={{ width: w.turi }}>
              Turi
            </th>
            <th className="px-4 py-3 font-medium" style={{ width: w.usul }}>
              Usul
            </th>
            <th className="px-4 py-3 font-medium" style={{ width: w.qabul }}>
              Qabul qilgan
            </th>
            {showActions && (
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
          {items.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{formatDateUz(p.paidAt)}</td>
              {showStudent && (
                <td className="px-4 py-3 truncate">
                  {p.student?.firstName} {p.student?.lastName}
                </td>
              )}
              <td className="px-4 py-3 text-right tabular-nums font-medium">
                <span className={p.type === "refund" ? "text-rose-500" : ""}>
                  {p.type === "refund" ? "−" : ""}
                  {formatMoney(p.amount)}
                </span>
              </td>
              <td className="px-4 py-3">
                {p.type === "refund" ? (
                  <Badge variant="outline" className="text-rose-500 border-rose-200">
                    Qaytarilgan
                  </Badge>
                ) : (
                  <Badge className="bg-emerald-100 text-emerald-700">To'lov</Badge>
                )}
              </td>
              <td className="px-4 py-3 truncate">{p.method?.name || "-"}</td>
              <td className="px-4 py-3 truncate text-muted-foreground">
                {p.receivedBy
                  ? `${p.receivedBy.firstName} ${p.receivedBy.lastName}`
                  : "-"}
              </td>
              {showActions && (
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      playClickSound={false}
                    >
                      <a
                        href={`/owner/payments/receipt/${p._id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Receipt className="size-4" />
                        Chek
                      </a>
                    </Button>
                    {p.type === "payment" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() =>
                          openModal(MODAL.PAYMENT_REFUND, { payment: p })
                        }
                        playClickSound={false}
                      >
                        <Undo2 className="size-4" />
                        Qaytarish
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
