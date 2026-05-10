import Button from "@/shared/components/ui/button/Button";
import usePaymentMethodRemoveMutation from "../hooks/usePaymentMethodRemoveMutation";

const PaymentMethodDeleteModal = ({ paymentMethod, close, isLoading, setIsLoading }) => {
  const { mutate } = usePaymentMethodRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate(paymentMethod._id);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">{paymentMethod?.name}</span> arxivlanadi.
        Eski to'lovlar tarixida saqlanib qoladi.
      </p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleConfirm}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Arxivlanmoqda..." : "Arxivlash"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodDeleteModal;
