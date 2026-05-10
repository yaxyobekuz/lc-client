import SelectField from "@/shared/components/ui/select/SelectField";
import useDiscountKindsQuery from "@/owner/features/discountKinds/hooks/useDiscountKindsQuery";

const DiscountKindPicker = ({ value, onChange, disabled = false }) => {
  const { data, isLoading } = useDiscountKindsQuery({ limit: 200 });
  const options = (data?.data || []).map((s) => ({
    value: s._id,
    label: s.name,
  }));

  return (
    <SelectField
      searchable
      label="Chegirma turi"
      placeholder="Tanlang"
      emptyText="Turlar topilmadi"
      value={value || ""}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      required
      disabled={disabled}
    />
  );
};

export default DiscountKindPicker;
