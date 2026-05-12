import { Pencil, Trash2 } from "lucide-react";
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";
import LeadStatusBadge from "@/shared/components/lead/LeadStatusBadge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const LeadStatusesTable = ({ items = [] }) => {
  const { openModal } = useModal();

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Statuslar topilmadi
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">#</th>
            <th className="px-4 py-2 font-medium">Tartib</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Bayroqlar</th>
            <th className="px-4 py-2 font-medium">Holat</th>
            <th className="px-4 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s, i) => (
            <tr key={s._id} className="border-t">
              <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-4 py-2">{s.order ?? 0}</td>
              <td className="px-4 py-2">
                <LeadStatusBadge status={s} />
              </td>
              <td className="px-4 py-2">
                <div className="flex flex-wrap gap-1">
                  {s.isInitial && (
                    <Badge className="bg-slate-100 text-slate-700">
                      Boshlang'ich
                    </Badge>
                  )}
                  {s.isFinal && (
                    <Badge className="bg-orange-100 text-orange-700">
                      Yakuniy
                    </Badge>
                  )}
                  {s.isConverted && (
                    <Badge className="bg-green-100 text-green-700">
                      O'quvchi
                    </Badge>
                  )}
                  {!s.isInitial && !s.isFinal && !s.isConverted && (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-2">
                {s.isActive ? (
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
                      openModal(MODAL.LEAD_STATUS_FORM_EDIT, { leadStatus: s })
                    }
                    playClickSound={false}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  {s.isActive && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() =>
                        openModal(MODAL.LEAD_STATUS_FORM_DELETE, {
                          leadStatus: s,
                        })
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

export default LeadStatusesTable;
