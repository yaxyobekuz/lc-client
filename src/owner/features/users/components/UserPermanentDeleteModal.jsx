// Router
import { useNavigate } from "react-router-dom";

// Components
import Button from "@/shared/components/ui/button/Button";

// Hooks
import useUserPermanentRemoveMutation from "../hooks/useUserPermanentRemoveMutation";

const UserPermanentDeleteModal = ({ user, close, isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const { mutate } = useUserPermanentRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
      navigate("/owner/users", { replace: true });
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate(user._id);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">
          {user?.firstName} {user?.lastName}
        </span>{" "}
        butunlay o'chiriladi. Unga bog'liq barcha to'lov, hisob, davomat va
        guruh a'zoligi UI'dan butunlay yo'qoladi va hech qayerda hisoblanmaydi.
        Bu - arxivlash emas (ma'lumotlar bazada saqlanadi, lekin ko'rinmaydi).
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

export default UserPermanentDeleteModal;
