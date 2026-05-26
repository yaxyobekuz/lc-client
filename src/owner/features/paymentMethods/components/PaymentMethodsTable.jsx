import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import usePaymentMethodUpdateMutation from "../hooks/usePaymentMethodUpdateMutation";

const PaymentMethodsTable = ({ items = [] }) => {
  const { openModal } = useModal();
  const { mutate: updateMethod, isPending: isRestoring } =
    usePaymentMethodUpdateMutation();

  const handleRestore = (item) => {
    updateMethod({ id: item._id, body: { isActive: true } });
  };

  if (items.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        To'lov usullari topilmadi
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-hidden bg-white">
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 font-medium text-left w-12">#</th>
            <th className="px-4 py-2 font-medium text-left">Nom</th>
            <th className="px-4 py-2 font-medium text-left">Kod</th>
            <th className="px-4 py-2 font-medium text-left w-28">Holat</th>
            <th className="px-4 py-2 font-medium text-right w-32">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s, i) => (
            <tr key={s._id} className="border-t">
              <td className="px-4 py-2 text-left text-muted-foreground">
                {i + 1}
              </td>
              <td className="px-4 py-2 text-left">{s.name}</td>
              <td className="px-4 py-2 text-left text-muted-foreground">
                {s.code || "-"}
              </td>
              <td className="px-4 py-2 text-left">
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
                      openModal(MODAL.PAYMENT_METHOD_EDIT, { paymentMethod: s })
                    }
                    playClickSound={false}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  {s.isActive ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() =>
                        openModal(MODAL.PAYMENT_METHOD_DELETE, { paymentMethod: s })
                      }
                      playClickSound={false}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-700"
                      onClick={() => handleRestore(s)}
                      disabled={isRestoring}
                      title="Tiklash"
                      playClickSound={false}
                    >
                      <RotateCcw className="size-4" />
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

export default PaymentMethodsTable;
