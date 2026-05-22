import { Pencil, Trash2 } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";
import ExpenseCategoryBadge from "./ExpenseCategoryBadge";

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
    <div className="border rounded-sm overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Sana</th>
            <th className="px-4 py-2 font-medium">Kategoriya</th>
            <th className="px-4 py-2 font-medium text-right">Summa</th>
            <th className="px-4 py-2 font-medium">Izoh</th>
            <th className="px-4 py-2 font-medium">Yaratdi</th>
            <th className="px-4 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((e) => (
            <tr key={e._id} className="border-t">
              <td className="px-4 py-2">{formatDateUz(e.date)}</td>
              <td className="px-4 py-2">
                <ExpenseCategoryBadge category={e.category} />
              </td>
              <td className="px-4 py-2 text-right font-medium">
                {formatMoney(e.amount)}
              </td>
              <td className="px-4 py-2 text-muted-foreground">
                {e.description || "-"}
              </td>
              <td className="px-4 py-2">{fullName(e.createdBy)}</td>
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
                    className="text-red-600 hover:text-red-700"
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
