import SelectField from "@/shared/components/ui/select/SelectField";
import useLeadSourcesQuery from "@/owner/features/leadSources/hooks/useLeadSourcesQuery";

const LeadSourcePicker = ({ value, onChange, disabled = false, label = "Lid manbasi" }) => {
  const { data, isLoading } = useLeadSourcesQuery({ limit: 200 });
  const options = (data?.data || []).map((s) => ({
    value: s._id,
    label: s.name,
  }));

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
