import SelectField from "@/shared/components/ui/select/SelectField";
import useLeadStatusesQuery from "@/owner/features/leadStatuses/hooks/useLeadStatusesQuery";

const StatusPicker = ({
  value,
  onChange,
  disabled = false,
  label = "Status",
  required = false,
  hideConverted = false,
}) => {
  const { data, isLoading } = useLeadStatusesQuery({ limit: 200 });
  const all = data?.data || [];
  const filtered = hideConverted ? all.filter((s) => !s.isConverted) : all;
  const options = filtered.map((s) => ({
    value: s._id,
    label: s.name,
  }));

  return (
    <SelectField
      searchable
      label={label}
      placeholder="Statusni tanlang"
      emptyText="Statuslar topilmadi"
      value={value || ""}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
      required={required}
    />
  );
};

export default StatusPicker;
