import { Pencil, Trash2 } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";
import ExpenseTypeBadge from "./ExpenseTypeBadge";

const fullName = (u) =>
  u ? `${u.firstName || ""} ${u.lastName || ""}`.trim() || "-" : "-";

const ExpensesTable = ({ items = [] }) => {
  const { openModal } = useModal();

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Xarajatlar topilmadi
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 font-medium text-left whitespace-nowrap">Sana</th>
            <th className="px-4 py-2 font-medium text-left whitespace-nowrap">Xarajat turi</th>
            <th className="px-4 py-2 font-medium text-left whitespace-nowrap">Summa</th>
            <th className="px-4 py-2 font-medium text-left">Izoh</th>
            <th className="px-4 py-2 font-medium text-left whitespace-nowrap">Yaratdi</th>
            <th className="px-4 py-2 font-medium text-right whitespace-nowrap">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((e) => (
            <tr key={e._id} className="border-t">
              <td className="px-4 py-2 text-left">{formatDateUz(e.date)}</td>
              <td className="px-4 py-2 text-left">
                <ExpenseTypeBadge type={e.type} />
              </td>
              <td className="px-4 py-2 text-left font-medium">
                {formatMoney(e.amount)}
              </td>
              <td className="px-4 py-2 text-left text-muted-foreground">
                {e.description || "-"}
              </td>
              <td className="px-4 py-2 text-left">{fullName(e.createdBy)}</td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      openModal(MODAL.EXPENSE_EDIT, { expense: e })
                    }
                    playClickSound={false}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() =>
                      openModal(MODAL.EXPENSE_DELETE, { expense: e })
                    }
                    playClickSound={false}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
