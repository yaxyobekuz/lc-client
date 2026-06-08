import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import Switch from "@/shared/components/ui/switch/Switch";
import { todayInput } from "@/shared/utils/formatDate";
import { useFreezeCreateMutation } from "../hooks/useFreezeMutations";

// O'quvchini vaqtincha muzlatish: oraliqdagi dars kunlari davomat hisobidan
// chiqariladi (foizga ta'sir qilmaydi). To'lovga tegmaydi.
const StudentFreezeModal = ({ studentId, studentName, close, isLoading, setIsLoading }) => {
  const today = todayInput();
  const obj = useObjectState({
    startDate: today,
    endDate: today,
    openEnded: false, // muddatsiz (qo'lda tugatilguncha)
    reason: "",
  });

  const { mutate } = useFreezeCreateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentId || !obj.startDate) return;
    setIsLoading(true);
    mutate({
      student: studentId,
      startDate: obj.startDate,
      endDate: obj.openEnded ? null : obj.endDate || null,
      reason: obj.reason,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {studentName && (
        <p className="text-sm text-muted-foreground">
          O'quvchi: <span className="font-medium text-foreground">{studentName}</span>
        </p>
      )}

      <div className="flex items-start justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
        <div>
          <p className="text-sm font-medium">Muddatsiz muzlatish</p>
          <p className="text-xs text-muted-foreground">
            Tugash sanasiz — qo'lda bekor qilinguncha davom etadi
          </p>
        </div>
        <Switch
          checked={obj.openEnded}
          onChange={(checked) => obj.setField("openEnded", checked)}
          disabled={isLoading}
        />
      </div>

      <InputField
        type="date"
        name="startDate"
        label="Boshlanish sanasi"
        value={obj.startDate}
        onChange={(e) => obj.setField("startDate", e.target.value)}
        disabled={isLoading}
        required
      />

      {!obj.openEnded && (
        <InputField
          type="date"
          name="endDate"
          label="Tugash sanasi"
          value={obj.endDate}
          min={obj.startDate}
          onChange={(e) => obj.setField("endDate", e.target.value)}
          disabled={isLoading}
        />
      )}

      <InputField
        name="reason"
        label="Sabab (ixtiyoriy)"
        placeholder="Masalan: ta'til, kasallik..."
        value={obj.reason}
        onChange={(e) => obj.setField("reason", e.target.value)}
        disabled={isLoading}
      />

      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={close} disabled={isLoading}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saqlanmoqda..." : "Muzlatish"}
        </Button>
      </div>
    </form>
  );
};

export default StudentFreezeModal;
