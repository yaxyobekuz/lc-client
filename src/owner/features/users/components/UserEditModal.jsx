import useObjectState from "@/shared/hooks/useObjectState";
import useUserUpdateMutation from "../hooks/useUserUpdateMutation";

import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";

import LeadSourcePicker from "./LeadSourcePicker";
import { ROLES } from "@/shared/constants/roles";
import { toDateInput } from "@/shared/utils/formatDate";

const GENDER_OPTIONS = [
  { value: "male", label: "Erkak" },
  { value: "female", label: "Ayol" },
];

const buildInitial = (user) => ({
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  phone: user?.phone || "",
  birthDate: toDateInput(user?.birthDate),
  gender: user?.gender || "",

  // student
  address: user?.address || "",
  parentName: user?.parentName || "",
  parentPhone: user?.parentPhone || "",
  enrolledAt: toDateInput(user?.enrolledAt),
  leadSource:
    typeof user?.leadSource === "object" && user?.leadSource
      ? user.leadSource._id
      : user?.leadSource || "",

  // teacher
  hiredAt: toDateInput(user?.hiredAt),
});

// `user` ModalWrapper data orqali keladi
const UserEditModal = ({ user, close, isLoading, setIsLoading }) => {
  const obj = useObjectState(buildInitial(user));
  const isStudent = user?.role === ROLES.STUDENT;
  const isTeacher = user?.role === ROLES.TEACHER;

  const { mutate } = useUserUpdateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      firstName: obj.firstName.trim(),
      lastName: obj.lastName.trim(),
      phone: obj.phone || undefined,
      birthDate: obj.birthDate || null,
      gender: obj.gender || null,
    };

    if (isStudent) {
      body.address = obj.address;
      body.parentName = obj.parentName;
      body.parentPhone = obj.parentPhone;
      body.enrolledAt = obj.enrolledAt || null;
      body.leadSource = obj.leadSource || null;
    }
    if (isTeacher) {
      body.hiredAt = obj.hiredAt || null;
    }

    setIsLoading(true);
    mutate({ id: user._id, body });
  };

  const today = toDateInput(new Date());

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        <InputField
          name="firstName"
          label="Ism"
          value={obj.firstName}
          onChange={(e) => obj.setField("firstName", e.target.value)}
          required
          disabled={isLoading}
        />
        <InputField
          name="lastName"
          label="Familiya"
          value={obj.lastName}
          onChange={(e) => obj.setField("lastName", e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <InputField
        type="tel"
        name="phone"
        label="Telefon"
        value={obj.phone}
        onChange={(e) => obj.setField("phone", e.target.value)}
        disabled={isLoading}
      />

      <div className="grid grid-cols-2 gap-3">
        <InputField
          type="date"
          name="birthDate"
          label="Tug'ilgan sana"
          value={obj.birthDate}
          max={today}
          onChange={(e) => obj.setField("birthDate", e.target.value)}
          disabled={isLoading}
        />
        <SelectField
          label="Jinsi"
          value={obj.gender}
          onChange={(v) => obj.setField("gender", v)}
          options={GENDER_OPTIONS}
          placeholder="Tanlang"
          disabled={isLoading}
        />
      </div>

      {isStudent && (
        <>
          <InputField
            name="address"
            label="Manzil"
            value={obj.address}
            onChange={(e) => obj.setField("address", e.target.value)}
            disabled={isLoading}
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              name="parentName"
              label="Ota-ona ismi"
              value={obj.parentName}
              onChange={(e) => obj.setField("parentName", e.target.value)}
              disabled={isLoading}
            />
            <InputField
              type="tel"
              name="parentPhone"
              label="Ota-ona telefoni"
              value={obj.parentPhone}
              onChange={(e) => obj.setField("parentPhone", e.target.value)}
              disabled={isLoading}
            />
          </div>
          <InputField
            type="date"
            name="enrolledAt"
            label="Ro'yxatga olingan sana"
            value={obj.enrolledAt}
            max={today}
            onChange={(e) => obj.setField("enrolledAt", e.target.value)}
            disabled={isLoading}
          />
          <LeadSourcePicker
            value={obj.leadSource}
            onChange={(v) => obj.setField("leadSource", v)}
            disabled={isLoading}
          />
        </>
      )}

      {isTeacher && (
        <InputField
          type="date"
          name="hiredAt"
          label="Ishga olingan sana"
          value={obj.hiredAt}
          max={today}
          onChange={(e) => obj.setField("hiredAt", e.target.value)}
          disabled={isLoading}
        />
      )}

      <div className="flex gap-2 pt-2 sticky bottom-0 bg-white">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default UserEditModal;
