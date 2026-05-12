import Button from "@/shared/components/ui/button/Button";
import useDiscountKindRemoveMutation from "../hooks/useDiscountKindRemoveMutation";

const DiscountKindDeleteModal = ({ discountKind, close, isLoading, setIsLoading }) => {
  const { mutate } = useDiscountKindRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate(discountKind._id);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">{discountKind?.name}</span> arxivlanadi.
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
          variant="danger"
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

export default DiscountKindDeleteModal;
