import { useEffect } from "react";
import SelectField from "@/shared/components/ui/select/SelectField";
import useLeadSourcesQuery from "@/owner/features/leadSources/hooks/useLeadSourcesQuery";

const LeadSourcePicker = ({
  value,
  onChange,
  disabled = false,
  label = "Lid manbasi",
  autoDefault = false,
}) => {
  const { data, isLoading } = useLeadSourcesQuery({ limit: 200 });
  const sources = data?.data || [];

  const defaultSource = sources.find((s) => s.isDefault);
  const options = sources.map((s) => ({
    value: s._id,
    label: s.isDefault ? `${s.name} (asosiy)` : s.name,
  }));

  // Default belgilangan bo'lsa va hali tanlanmagan bo'lsa — avto tanlash (opt-in)
  useEffect(() => {
    if (autoDefault && !value && defaultSource) {
      onChange(defaultSource._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDefault, value, defaultSource?._id]);

  return (
    <SelectField
      searchable
      label={label}
      placeholder="Tanlang (ixtiyoriy)"
      emptyText="Manbalar topilmadi"
      value={value || ""}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
    />
  );
};

export default LeadSourcePicker;
