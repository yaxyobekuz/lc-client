import SelectField from "@/shared/components/ui/select/SelectField";
import usePaymentMethodsQuery from "@/owner/features/paymentMethods/hooks/usePaymentMethodsQuery";

const PaymentMethodPicker = ({
  value,
  onChange,
  disabled = false,
  label = "To'lov usuli",
  error = false,
}) => {
  const { data, isLoading } = usePaymentMethodsQuery({ limit: 200 });
  const options = (data?.data || []).map((m) => ({
    value: m._id,
    label: m.name,
  }));

  return (
    <SelectField
      searchable
      label={label}
      placeholder="Tanlang"
      emptyText="Usullar topilmadi"
      value={value || ""}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      required
      error={error}
      disabled={disabled}
    />
  );
};

export default PaymentMethodPicker;
