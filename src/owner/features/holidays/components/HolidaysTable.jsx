import { Pencil, Trash2 } from "lucide-react";
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import {
  HOLIDAY_AUDIENCE_LABEL,
  MONTH_OPTIONS,
} from "@/shared/constants/notification";

const monthName = (m) =>
  MONTH_OPTIONS.find((o) => o.value === m)?.label || m;

const HolidaysTable = ({ items = [] }) => {
  const { openModal } = useModal();

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Bayramlar topilmadi
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Sana</th>
            <th className="px-4 py-2 font-medium">Nom</th>
            <th className="px-4 py-2 font-medium">Tur</th>
            <th className="px-4 py-2 font-medium">Auditoriya</th>
            <th className="px-4 py-2 font-medium">Holat</th>
            <th className="px-4 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((h) => (
            <tr key={h._id} className="border-t">
              <td className="px-4 py-2">
                {h.day} {monthName(h.month)}
                {h.year ? ` ${h.year}` : ""}
              </td>
              <td className="px-4 py-2 font-medium">{h.name}</td>
              <td className="px-4 py-2">
                {h.isRecurring ? (
                  <Badge variant="outline">Yillik</Badge>
                ) : (
                  <Badge variant="outline">Bir martalik</Badge>
                )}
              </td>
              <td className="px-4 py-2">
                {HOLIDAY_AUDIENCE_LABEL[h.audience] || h.audience}
              </td>
              <td className="px-4 py-2">
                {h.isActive ? (
                  <Badge className="bg-green-100 text-green-700">Faol</Badge>
                ) : (
                  <Badge variant="outline">Arxiv</Badge>
                )}
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      openModal(MODAL.HOLIDAY_EDIT, { holiday: h })
                    }
                    playClickSound={false}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  {h.isActive && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() =>
                        openModal(MODAL.HOLIDAY_DELETE, { holiday: h })
                      }
                      playClickSound={false}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HolidaysTable;
