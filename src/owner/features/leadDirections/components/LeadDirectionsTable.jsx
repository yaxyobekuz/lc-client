import { Pencil, Trash2, Star } from "lucide-react";
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { cn } from "@/shared/utils/cn";
import useLeadDirectionSetDefaultMutation from "../hooks/useLeadDirectionSetDefaultMutation";

const LeadDirectionsTable = ({ items = [] }) => {
  const { openModal } = useModal();
  const { mutate: setDefault, isPending: isSettingDefault } =
    useLeadDirectionSetDefaultMutation();

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Yo'nalishlar topilmadi
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">#</th>
            <th className="px-4 py-2 font-medium">Nom</th>
            <th className="px-4 py-2 font-medium">Holat</th>
            <th className="px-4 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d, i) => (
            <tr key={d._id} className="border-t">
              <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-4 py-2">
                <span className="inline-flex items-center gap-1.5">
                  {d.name}
                  {d.isDefault && (
                    <Badge
                      variant="outline"
                      className="border-amber-200 bg-amber-50 text-amber-700"
                    >
                      Asosiy
                    </Badge>
                  )}
                </span>
              </td>
              <td className="px-4 py-2">
                {d.isActive ? (
                  <Badge className="bg-green-100 text-green-700">Faol</Badge>
                ) : (
                  <Badge variant="outline">Arxiv</Badge>
                )}
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-end gap-1">
                  {d.isActive && !d.isDefault && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-amber-600"
                      title="Asosiy qilib belgilash"
                      disabled={isSettingDefault}
                      onClick={() => setDefault(d._id)}
                      
                    >
                      <Star className="size-4" />
                    </Button>
                  )}
                  {d.isDefault && (
                    <span
                      className="inline-flex size-8 items-center justify-center text-amber-500"
                      title="Asosiy yo'nalish"
                    >
                      <Star className={cn("size-4 fill-amber-400")} />
                    </span>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      openModal(MODAL.LEAD_DIRECTION_EDIT, {
                        leadDirection: d,
                      })
                    }
                    
                  >
                    <Pencil className="size-4" />
                  </Button>
                  {d.isActive && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() =>
                        openModal(MODAL.LEAD_DIRECTION_DELETE, {
                          leadDirection: d,
                        })
                      }
                      
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

export default LeadDirectionsTable;
