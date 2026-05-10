// Hooks
import useObjectState from "@/shared/hooks/useObjectState";
import useLeadDirectionsQuery from "@/owner/features/leadDirections/hooks/useLeadDirectionsQuery";

// Components
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import GroupScheduleField from "./GroupScheduleField";
import TeachersMultiPicker from "./TeachersMultiPicker";

const buildInitial = (group) => ({
  name: group?.name || "",
  schedule: group?.schedule?.map((s) => ({ ...s })) || [],
  teachers: (group?.teachers || []).map((t) =>
    typeof t === "string" ? t : t._id,
  ),
  monthlyPrice: group?.monthlyPrice ?? 0,
  direction:
    group?.direction && typeof group.direction === "object"
      ? group.direction._id
      : group?.direction || "",
});

const NONE_DIRECTION = "__none__";

const GroupForm = ({
  initial,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Saqlash",
}) => {
  const { name, schedule, teachers, monthlyPrice, direction, setField } =
    useObjectState(buildInitial(initial));

  const { data: directionsData } = useLeadDirectionsQuery({ limit: 200 });
  const directionOptions = [
    { value: NONE_DIRECTION, label: "Ko'rsatilmagan" },
    ...(directionsData?.data || []).map((d) => ({
      value: d._id,
      label: d.name,
    })),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      schedule,
      teachers,
      monthlyPrice: Number(monthlyPrice) || 0,
      direction: direction && direction !== NONE_DIRECTION ? direction : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        name="name"
        label="Guruh nomi"
        placeholder="Masalan: Arabcha A1"
        value={name}
        onChange={(e) => setField("name", e.target.value)}
        required
        disabled={isLoading}
      />

      <SelectField
        label="Yo'nalish"
        value={direction || NONE_DIRECTION}
        onChange={(v) => setField("direction", v)}
        options={directionOptions}
        disabled={isLoading}
      />

      <InputField
        name="monthlyPrice"
        label="Oylik narx (so'm)"
        type="number"
        min="0"
        value={monthlyPrice}
        onChange={(e) => setField("monthlyPrice", e.target.value)}
        disabled={isLoading}
      />

      <GroupScheduleField
        value={schedule}
        onChange={(next) => setField("schedule", next)}
        disabled={isLoading}
      />

      <TeachersMultiPicker
        value={teachers}
        onChange={(next) => setField("teachers", next)}
        disabled={isLoading}
      />

      <div className="flex gap-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Bekor qilish
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saqlanmoqda..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default GroupForm;
