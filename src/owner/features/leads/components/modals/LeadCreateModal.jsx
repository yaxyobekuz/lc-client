import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import SourcePicker from "../SourcePicker";
import DirectionPicker from "../DirectionPicker";
import AssignedStaffPicker from "../AssignedStaffPicker";
import { toDateInput } from "@/shared/utils/formatDate";
import { useLeadCreateMutation } from "../../hooks/useLeadMutations";

const LeadCreateModal = ({ close, isLoading, setIsLoading }) => {
  const obj = useObjectState({
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    source: "",
    direction: "",
    assignedTo: "",
    notes: "",
  });

  const { mutate } = useLeadCreateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.firstName.trim() || !obj.phone.trim()) return;
    setIsLoading(true);
    mutate({
      firstName: obj.firstName.trim(),
      lastName: obj.lastName.trim(),
      phone: obj.phone.trim(),
      birthDate: obj.birthDate || null,
      source: obj.source || undefined,
      direction: obj.direction || undefined,
      assignedTo: obj.assignedTo || undefined,
      notes: obj.notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <InputField
          name="firstName"
          label="Ism"
          value={obj.firstName}
          onChange={(e) => obj.setField("firstName", e.target.value)}
          required
          autoFocus
          disabled={isLoading}
        />
        <InputField
          name="lastName"
          label="Familiya"
          value={obj.lastName}
          onChange={(e) => obj.setField("lastName", e.target.value)}
          disabled={isLoading}
        />
      </div>
      <InputField
        name="phone"
        label="Telefon"
        placeholder="+998 90 ..."
        value={obj.phone}
        onChange={(e) => obj.setField("phone", e.target.value)}
        required
        disabled={isLoading}
      />
      <InputField
        name="birthDate"
        label="Tug'ilgan sana (ixtiyoriy)"
        type="date"
        value={toDateInput(obj.birthDate) || obj.birthDate || ""}
        onChange={(e) => obj.setField("birthDate", e.target.value)}
        disabled={isLoading}
      />
      <SourcePicker
        value={obj.source}
        onChange={(v) => obj.setField("source", v)}
        disabled={isLoading}
      />
      <DirectionPicker
        value={obj.direction}
        onChange={(v) => obj.setField("direction", v)}
        disabled={isLoading}
      />
      <AssignedStaffPicker
        value={obj.assignedTo}
        onChange={(v) => obj.setField("assignedTo", v)}
        disabled={isLoading}
      />
      <InputField
        name="notes"
        type="textarea"
        value={obj.notes}
        label="Izoh (ixtiyoriy)"
        onChange={(e) => obj.setField("notes", e.target.value)}
        disabled={isLoading}
      />
      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </div>
    </form>
  );
};

export default LeadCreateModal;
