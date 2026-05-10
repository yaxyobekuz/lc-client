import SelectField from "@/shared/components/ui/select/SelectField";
import useUsersListQuery from "@/owner/features/users/hooks/useUsersListQuery";
import { ROLES } from "@/shared/constants/roles";

const AssignedStaffPicker = ({
  value,
  onChange,
  disabled = false,
  label = "Mas'ul xodim",
  required = false,
}) => {
  const { data, isLoading } = useUsersListQuery({
    role: ROLES.OWNER,
    limit: 100,
  });
  const options = (data?.data || []).map((u) => ({
    value: u._id,
    label: `${u.firstName} ${u.lastName}`.trim() || u.username,
  }));

  return (
    <SelectField
      searchable
      label={label}
      placeholder="Mas'ulni tanlang"
      emptyText="Foydalanuvchilar topilmadi"
      value={value || ""}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
      required={required}
    />
  );
};

export default AssignedStaffPicker;
