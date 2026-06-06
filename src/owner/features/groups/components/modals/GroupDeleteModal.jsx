// Router
import { useNavigate } from "react-router-dom";

// Components
import Button from "@/shared/components/ui/button/Button";

// Hooks
import useGroupRemoveMutation from "../../hooks/useGroupRemoveMutation";

const GroupDeleteModal = ({ group, close, isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const { mutate } = useGroupRemoveMutation({
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
        <span className="font-semibold">{group?.name}</span> guruhi arxivlanadi
        (Arxiv filtrida ko'rinadi, qaytarish mumkin). Davom etasizmi?
      </p>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleConfirm}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Arxivlanmoqda..." : "Ha, arxivlash"}
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={() => close?.()}
          disabled={isLoading}
          autoFocus
          className="flex-1"
        >
          Yo'q, bekor qilish
        </Button>
      </div>
    </div>
  );
};

export default GroupDeleteModal;
