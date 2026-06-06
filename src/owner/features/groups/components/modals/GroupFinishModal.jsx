// Components
import Button from "@/shared/components/ui/button/Button";

// Hooks
import useGroupFinishMutation from "../../hooks/useGroupFinishMutation";

const GroupFinishModal = ({ group, close, isLoading, setIsLoading }) => {
  const { mutate } = useGroupFinishMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
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
        <span className="font-semibold">{group?.name}</span> kursi yakunlanadi.
        Bugundan keyin bu guruh uchun davomat, to'lov va o'qituvchi oyligi
        hisoblanmaydi. O'qigan qism uchun joriy oy hisobi qoladi.
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
          onClick={handleConfirm}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Yakunlanmoqda..." : "Ha, yakunlash"}
        </Button>
      </div>
    </div>
  );
};

export default GroupFinishModal;
