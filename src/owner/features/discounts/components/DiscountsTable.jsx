import { Infinity as InfinityIcon, Trash2 } from "lucide-react";
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import useStudentDiscountsQuery from "../hooks/useStudentDiscountsQuery";
import { MODAL } from "@/shared/constants/modals";
import { formatDateUz } from "@/shared/utils/formatDate";
import { formatMoney } from "@/shared/utils/formatMoney";

const DiscountsTable = ({ studentId }) => {
  const { openModal } = useModal();
  const { data, isLoading } = useStudentDiscountsQuery(studentId);
  const items = data?.data || [];

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Chegirmalar yo'q
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Turi</th>
            <th className="px-4 py-2 font-medium">Qiymat</th>
            <th className="px-4 py-2 font-medium">Sabab</th>
            <th className="px-4 py-2 font-medium">Boshlanish</th>
            <th className="px-4 py-2 font-medium">Tugash</th>
            <th className="px-4 py-2 font-medium">Holat</th>
            <th className="px-4 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d._id} className="border-t">
              <td className="px-4 py-2">
                {d.kind?.name}
                {d.kind?.isActive === false && (
                  <span className="text-muted-foreground ml-1 text-xs">(arxiv)</span>
                )}
              </td>
              <td className="px-4 py-2">
                {d.valueType === "percent"
                  ? `${d.value}%`
                  : formatMoney(d.value)}
              </td>
              <td className="px-4 py-2 text-muted-foreground">
                {d.reason || "-"}
              </td>
              <td className="px-4 py-2">{formatDateUz(d.startDate)}</td>
              <td className="px-4 py-2">
                {d.endDate ? (
                  formatDateUz(d.endDate)
                ) : (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <InfinityIcon className="size-3.5" />
                    Muddatsiz
                  </span>
                )}
              </td>
              <td className="px-4 py-2">
                {d.isActive ? (
                  <Badge className="bg-green-100 text-green-700">Faol</Badge>
                ) : (
                  <Badge variant="outline">Nofaol</Badge>
                )}
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() =>
                      openModal(MODAL.DISCOUNT_DELETE, { discount: d })
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

export default DiscountsTable;
