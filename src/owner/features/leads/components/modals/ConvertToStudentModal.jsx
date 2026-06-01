import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import { toDateInput } from "@/shared/utils/formatDate";
import { useConvertMutation } from "../../hooks/useLeadMutations";

const GENDER_OPTIONS = [
  { value: "", label: "Tanlanmagan" },
  { value: "male", label: "Erkak" },
  { value: "female", label: "Ayol" },
];

// Lead.firstName "Ali Valiev" bo'lsa firstName/lastName ga ajratamiz
const splitName = (full = "") => {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "" };
};

const ConvertToStudentModal = ({ lead, close, isLoading, setIsLoading }) => {
  const initial =
    lead?.lastName && lead.lastName.trim()
      ? { firstName: lead.firstName || "", lastName: lead.lastName }
      : splitName(lead?.firstName || "");

  const obj = useObjectState({
    firstName: initial.firstName,
    lastName: initial.lastName,
    username: "",
    phone: lead?.phone || "",
    password: "",
    gender: "",
    enrolledAt: toDateInput(new Date()),
  });

  const { mutate } = useConvertMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !obj.firstName.trim() ||
      !obj.lastName.trim() ||
      !obj.username.trim() ||
      !obj.phone.trim() ||
      !obj.password
    ) {
      return;
    }
    setIsLoading(true);
    mutate({
      id: lead._id,
      firstName: obj.firstName.trim(),
      lastName: obj.lastName.trim(),
      username: obj.username.trim().toLowerCase(),
      phone: obj.phone.trim(),
      password: obj.password,
      gender: obj.gender || null,
      enrolledAt: obj.enrolledAt || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Lid ma'lumotlari avto to'ldirildi. Username, parol va qolgan
        ixtiyoriy maydonlarni to'ldiring.
      </p>

      <div className="grid grid-cols-2 gap-2">
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

      <div className="grid grid-cols-2 gap-2">
        <InputField
          name="username"
          label="Username"
          value={obj.username}
          onChange={(e) => obj.setField("username", e.target.value)}
          required
          disabled={isLoading}
        />
        <InputField
          name="password"
          label="Parol"
          type="password"
          value={obj.password}
          onChange={(e) => obj.setField("password", e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <InputField
        name="phone"
        label="Telefon"
        value={obj.phone}
        onChange={(e) => obj.setField("phone", e.target.value)}
        required
        disabled={isLoading}
      />

      <div className="grid grid-cols-2 gap-2">
        <SelectField
          label="Jinsi"
          value={obj.gender}
          onChange={(v) => obj.setField("gender", v)}
          options={GENDER_OPTIONS}
          disabled={isLoading}
        />
        <InputField
          name="enrolledAt"
          label="Qabul qilingan sana"
          type="date"
          value={obj.enrolledAt}
          onChange={(e) => obj.setField("enrolledAt", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-2 pt-1">
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
          {isLoading ? "Yaratilmoqda..." : "O'quvchiga aylantirish"}
        </Button>
      </div>
    </form>
  );
};

export default ConvertToStudentModal;
