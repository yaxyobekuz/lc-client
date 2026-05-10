import SelectField from "@/shared/components/ui/select/SelectField";
import useLeadDirectionsQuery from "@/owner/features/leadDirections/hooks/useLeadDirectionsQuery";

const DirectionPicker = ({
  value,
  onChange,
  disabled = false,
  label = "Yo'nalish",
  required = false,
}) => {
  const { data, isLoading } = useLeadDirectionsQuery({ limit: 200 });
  const options = (data?.data || []).map((d) => ({
    value: d._id,
    label: d.name,
  }));

  return (
    <SelectField
      searchable
      label={label}
      placeholder="Yo'nalishni tanlang"
      emptyText="Yo'nalishlar topilmadi"
      value={value || ""}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
      required={required}
    />
  );
};

export default DirectionPicker;
