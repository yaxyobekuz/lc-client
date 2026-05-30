import SelectField from "@/shared/components/ui/select/SelectField";
import useGroupsListQuery from "@/owner/features/groups/hooks/useGroupsListQuery";

const GroupPicker = ({
  value,
  onChange,
  disabled = false,
  label = "Guruh",
  teacherId,
}) => {
  // teacherId berilsa, faqat shu o'qituvchi o'qitadigan guruhlar chiqadi
  const { data, isLoading } = useGroupsListQuery({ limit: 200, teacherId });
  const options = (data?.data || []).map((g) => ({
    value: g._id,
    label: g.name,
  }));

  return (
    <SelectField
      searchable
      label={label}
      placeholder="Guruhni tanlang"
      emptyText="Guruhlar topilmadi"
      value={value || ""}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
    />
  );
};

export default GroupPicker;
