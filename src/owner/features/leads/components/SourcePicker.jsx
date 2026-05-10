import SelectField from "@/shared/components/ui/select/SelectField";
import useLeadSourcesQuery from "@/owner/features/leadSources/hooks/useLeadSourcesQuery";

const SourcePicker = ({
  value,
  onChange,
  disabled = false,
  label = "Manba",
  required = false,
}) => {
  const { data, isLoading } = useLeadSourcesQuery({ limit: 200 });
  const options = (data?.data || []).map((s) => ({
    value: s._id,
    label: s.name,
  }));

  return (
    <SelectField
      searchable
      label={label}
      placeholder="Manbani tanlang"
      emptyText="Manbalar topilmadi"
      value={value || ""}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
      required={required}
    />
  );
};

export default SourcePicker;
