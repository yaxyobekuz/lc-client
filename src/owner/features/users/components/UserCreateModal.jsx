import { useState } from "react";

import useObjectState from "@/shared/hooks/useObjectState";
import useUserCreateMutation from "../hooks/useUserCreateMutation";

import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import StepBars from "@/shared/components/ui/steps/StepBars";

import LeadSourcePicker from "./LeadSourcePicker";
import { ROLES, ROLE_LABELS } from "@/shared/constants/roles";

const ROLE_OPTIONS = [
  { value: ROLES.STUDENT, label: ROLE_LABELS.student },
  { value: ROLES.TEACHER, label: ROLE_LABELS.teacher },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Erkak" },
  { value: "female", label: "Ayol" },
];

const initialState = (defaultRole) => ({
  firstName: "",
  lastName: "",
  username: "",
  phone: "",
  password: "",
  role: defaultRole || ROLES.STUDENT,

  birthDate: "",
  gender: "",

  // student
  address: "",
  parentName: "",
  parentPhone: "",
  leadSource: "",

  // teacher
  hiredAt: "",
});

const UserCreateModal = ({ defaultRole, close, isLoading, setIsLoading }) => {
  const [step, setStep] = useState(1);
  const obj = useObjectState(initialState(defaultRole));

  const isStudent = obj.role === ROLES.STUDENT;
  const totalSteps = isStudent ? 3 : 1;

  const { mutate } = useUserCreateMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const validateStep1 = () => {
    return (
      obj.firstName.trim() &&
      obj.lastName.trim() &&
      obj.username.trim() &&
      obj.phone &&
      obj.password &&
      obj.role
    );
  };

  const next = () => {
    if (step >= totalSteps) return submit();
    if (step === 1 && !validateStep1()) return;
    setStep((s) => Math.min(totalSteps, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    const body = {
      firstName: obj.firstName.trim(),
      lastName: obj.lastName.trim(),
      username: obj.username.trim(),
      phone: obj.phone,
      password: obj.password,
      role: obj.role,
    };
    if (obj.birthDate) body.birthDate = obj.birthDate;
    if (obj.gender) body.gender = obj.gender;

    if (isStudent) {
      if (obj.address) body.address = obj.address.trim();
      if (obj.parentName) body.parentName = obj.parentName.trim();
      if (obj.parentPhone) body.parentPhone = obj.parentPhone;
      if (obj.leadSource) body.leadSource = obj.leadSource;
    } else {
      if (obj.hiredAt) body.hiredAt = obj.hiredAt;
    }

    setIsLoading(true);
    mutate(body);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    next();
  };

  return (
    <form onSubmit={handleSubmitForm} className="space-y-3">
      {totalSteps > 1 && (
        <div className="space-y-1">
          <StepBars totalSteps={totalSteps} currentStep={step} />
          <p className="text-xs text-muted-foreground text-right">
            {step}/{totalSteps}
          </p>
        </div>
      )}

      {step === 1 && (
        <>
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
            name="username"
            label="Login (username)"
            value={obj.username}
            onChange={(e) => obj.setField("username", e.target.value)}
            required
            disabled={isLoading}
          />
          <InputField
            type="tel"
            name="phone"
            label="Telefon"
            value={obj.phone}
            onChange={(e) => obj.setField("phone", e.target.value)}
            required
            disabled={isLoading}
          />
          <InputField
            type="password"
            name="password"
            label="Parol"
            value={obj.password}
            onChange={(e) => obj.setField("password", e.target.value)}
            required
            disabled={isLoading}
          />
          <SelectField
            label="Rol"
            value={obj.role}
            onChange={(v) => obj.setField("role", v)}
            options={ROLE_OPTIONS}
            required
            disabled={isLoading}
          />

          {!isStudent && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  type="date"
                  name="birthDate"
                  label="Tug'ilgan sana"
                  value={obj.birthDate}
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
              <InputField
                type="date"
                name="hiredAt"
                label="Ishga olingan sana"
                value={obj.hiredAt}
                onChange={(e) => obj.setField("hiredAt", e.target.value)}
                disabled={isLoading}
              />
            </>
          )}
        </>
      )}

      {step === 2 && isStudent && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              type="date"
              name="birthDate"
              label="Tug'ilgan sana"
              value={obj.birthDate}
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
          <InputField
            name="address"
            label="Manzil"
            value={obj.address}
            onChange={(e) => obj.setField("address", e.target.value)}
            disabled={isLoading}
          />
          <LeadSourcePicker
            value={obj.leadSource}
            onChange={(v) => obj.setField("leadSource", v)}
            disabled={isLoading}
          />
        </>
      )}

      {step === 3 && isStudent && (
        <>
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
        </>
      )}

      <div className="flex gap-2 pt-1">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={back}
            disabled={isLoading}
            className="flex-1"
          >
            Orqaga
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => close?.()}
            disabled={isLoading}
            className="flex-1"
          >
            Bekor qilish
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading
            ? "Yaratilmoqda..."
            : step < totalSteps
              ? "Keyingi"
              : "Yaratish"}
        </Button>
      </div>
    </form>
  );
};

export default UserCreateModal;
