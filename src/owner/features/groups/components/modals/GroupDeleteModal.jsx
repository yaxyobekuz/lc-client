// Router
import { useNavigate } from "react-router-dom";

// Components
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";

// Hooks
import useObjectState from "@/shared/hooks/useObjectState";
import useGroupRemoveMutation from "../../hooks/useGroupRemoveMutation";

const todayKey = () => new Date().toISOString().slice(0, 10);

const GroupDeleteModal = ({ group, close, isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const form = useObjectState({ archivedAt: todayKey() });

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
    mutate({ id: group._id, archivedAt: form.archivedAt || todayKey() });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <span className="font-semibold">{group?.name}</span> guruhi arxivlanadi.
        Belgilangan sanada aktiv o'qituvchi ish davri yopiladi va guruhdagi
        amallar (to'lov, davomat, davr) to'xtaydi. O'quvchilar guruhda qoladi va
        keyin arxivdan chiqarish mumkin.
      </p>

      <InputField
        name="archivedAt"
        type="date"
        label="Arxivlash sanasi"
        max={todayKey()}
        value={form.archivedAt}
        onChange={(e) => form.setField("archivedAt", e.target.value)}
      />

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
          disabled={isLoading || !form.archivedAt}
          className="flex-1"
        >
          {isLoading ? "Arxivlanmoqda..." : "Ha, arxivlash"}
        </Button>
      </div>
    </div>
  );
};

export default GroupDeleteModal;
