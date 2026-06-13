// Components
import Button from "@/shared/components/ui/button/Button";

// Utils
import { formatMoney } from "@/shared/utils/formatMoney";

// Hooks
import { useRefundCreateMutation } from "../../hooks/useFinanceMutations";

// item - karta orqali uzatiladi (ModalWrapper data)
const RefundConfirmModal = ({ item, close, isLoading, setIsLoading }) => {
  const { mutate } = useRefundCreateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const student = item?.student || {};
  const refundable = item?.refundable || 0;

  const handleConfirm = () => {
    setIsLoading(true);
    mutate({ paymentId: item._id });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">
          {student.firstName} {student.lastName}
        </span>{" "}
        o'quvchiga{" "}
        <span className="font-semibold text-rose-600">
          {formatMoney(refundable)}
        </span>{" "}
        ortiqcha to'lov qaytarib berildi deb belgilanadi. Bu summa shu o'quvchiga
        naqd/karta orqali qaytarilganini tasdiqlaysizmi?
      </p>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          autoFocus
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Saqlanmoqda..." : "Ha, qaytarildi"}
        </Button>
      </div>
    </div>
  );
};

export default RefundConfirmModal;
