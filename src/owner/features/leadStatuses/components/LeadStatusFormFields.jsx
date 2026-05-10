import InputField from "@/shared/components/ui/input/InputField";
import Switch from "@/shared/components/ui/switch/Switch";
import ColorPicker from "./ColorPicker";

const FlagRow = ({ label, description, checked, onChange, disabled }) => (
  <div className="flex items-center justify-between gap-3 py-2">
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <Switch checked={!!checked} onChange={onChange} disabled={disabled} />
  </div>
);

const LeadStatusFormFields = ({ obj, disabled = false }) => (
  <div className="space-y-3">
    <InputField
      name="name"
      label="Nom"
      placeholder="Masalan: Bog'lanildi"
      value={obj.name}
      onChange={(e) => obj.setField("name", e.target.value)}
      required
      disabled={disabled}
    />
    <ColorPicker
      value={obj.color}
      onChange={(v) => obj.setField("color", v)}
      disabled={disabled}
    />
    <InputField
      name="order"
      label="Tartib raqami"
      type="number"
      min="0"
      description="Pipeline ichida tartib (kichik raqam — birinchi)"
      value={obj.order}
      onChange={(e) => obj.setField("order", e.target.value)}
      disabled={disabled}
    />

    <div className="border rounded-lg p-3 space-y-1">
      <FlagRow
        label="Boshlang'ich (isInitial)"
        description="Yangi lid yaratilganda avto qo'yiladi"
        checked={obj.isInitial}
        onChange={(v) => obj.setField("isInitial", v)}
        disabled={disabled}
      />
      <FlagRow
        label="Yakuniy (isFinal)"
        description="Pipeline yopilgan: rad etdi yoki ro'yxatdan o'tdi"
        checked={obj.isFinal}
        onChange={(v) => obj.setField("isFinal", v)}
        disabled={disabled}
      />
      <FlagRow
        label="O'quvchiga aylangan (isConverted)"
        description="Konversiya statusi (faqat /convert API orqali o'tkaziladi)"
        checked={obj.isConverted}
        onChange={(v) => obj.setField("isConverted", v)}
        disabled={disabled}
      />
    </div>
  </div>
);

export default LeadStatusFormFields;
