import SelectField from "@/shared/components/ui/select/SelectField";
import useUsersListQuery from "@/owner/features/users/hooks/useUsersListQuery";
import { ROLES } from "@/shared/constants/roles";

const TeacherPicker = ({
  value,
  onChange,
  disabled = false,
  label = "O'qituvchi",
  required = false,
}) => {
  const { data, isLoading } = useUsersListQuery({
    role: ROLES.TEACHER,
    limit: 200,
  });
  const options = (data?.data || []).map((u) => ({
    value: u._id,
    label: `${u.firstName} ${u.lastName}`,
  }));

  return (
    <SelectField
      searchable
      label={label}
      placeholder="O'qituvchini tanlang"
      emptyText="O'qituvchilar topilmadi"
      value={value || ""}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
      required={required}
    />
  );
};

export default TeacherPicker;
