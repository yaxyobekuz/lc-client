// Router
import { useNavigate } from "react-router-dom";

// Components
import Button from "@/shared/components/ui/button/Button";

// Hooks
import useGroupPermanentRemoveMutation from "../../hooks/useGroupPermanentRemoveMutation";

const GroupPermanentDeleteModal = ({ group, close, isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const { mutate } = useGroupPermanentRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
      navigate("/owner/groups", { replace: true });
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate(group._id);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">{group?.name}</span> guruhi butunlay
        o'chiriladi. Bog'liq barcha ma'lumotlar ko'rinmaydi.
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
          {isLoading ? "O'chirilmoqda..." : "Ha, butunlay o'chirish"}
        </Button>
      </div>
    </div>
  );
};

export default GroupPermanentDeleteModal;
