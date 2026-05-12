import { Pencil, Trash2 } from "lucide-react";
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { TEMPLATE_CATEGORY_LABEL } from "@/shared/constants/notification";

const TemplatesTable = ({ items = [] }) => {
  const { openModal } = useModal();

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Shablonlar topilmadi
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">#</th>
            <th className="px-4 py-2 font-medium">Nom</th>
            <th className="px-4 py-2 font-medium">Kategoriya</th>
            <th className="px-4 py-2 font-medium">Matn (qisqa)</th>
            <th className="px-4 py-2 font-medium">Holat</th>
            <th className="px-4 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t, i) => (
            <tr key={t._id} className="border-t">
              <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-4 py-2 font-medium">{t.name}</td>
              <td className="px-4 py-2">
                <Badge variant="outline">
                  {TEMPLATE_CATEGORY_LABEL[t.category] || t.category}
                </Badge>
              </td>
              <td className="px-4 py-2 text-muted-foreground max-w-md truncate">
                {t.body}
              </td>
              <td className="px-4 py-2">
                {t.isActive ? (
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
                      openModal(MODAL.NOTIFICATION_TEMPLATE_EDIT, {
                        template: t,
                      })
                    }
                    playClickSound={false}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  {t.isActive && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() =>
                        openModal(MODAL.NOTIFICATION_TEMPLATE_DELETE, {
                          template: t,
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

export default TemplatesTable;
