import { useMemo } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import useAuth from "@/shared/hooks/useAuth";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import { ROLES } from "@/shared/constants/roles";

import TemplatePicker from "../TemplatePicker";
import GroupsMultiSelect from "../GroupsMultiSelect";
import UsersMultiSelect from "../UsersMultiSelect";
import useSendNotificationMutation from "../../hooks/useSendNotificationMutation";

const OWNER_AUDIENCE_OPTIONS = [
  { value: "all_students", label: "Barcha o'quvchilar" },
  { value: "all_teachers", label: "Barcha o'qituvchilar" },
  { value: "groups", label: "Guruh(lar) bo'yicha" },
  { value: "users", label: "Tanlangan foydalanuvchilar" },
  { value: "individual", label: "Bitta foydalanuvchi" },
];

const TEACHER_AUDIENCE_OPTIONS = [
  { value: "groups", label: "Guruh(lar) bo'yicha" },
  { value: "users", label: "Tanlangan o'quvchilar" },
];

const SendNotificationModal = ({ close, isLoading, setIsLoading }) => {
  const { role } = useAuth();
  const isTeacher = role === ROLES.TEACHER;
  const audienceOptions = isTeacher
    ? TEACHER_AUDIENCE_OPTIONS
    : OWNER_AUDIENCE_OPTIONS;

  const obj = useObjectState({
    audienceType: audienceOptions[0].value,
    groupIds: [],
    userIds: [],
    templateId: "",
    title: "",
    body: "",
  });

  const { mutate } = useSendNotificationMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleTemplateChange = (id, tpl) => {
    obj.setField("templateId", id);
    if (tpl) {
      obj.setField("body", tpl.body);
    }
  };

  const audienceValid = useMemo(() => {
    if (obj.audienceType === "groups") return obj.groupIds.length > 0;
    if (obj.audienceType === "users" || obj.audienceType === "individual") {
      return obj.userIds.length > 0;
    }
    return true;
  }, [obj.audienceType, obj.groupIds, obj.userIds]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.body.trim() || !audienceValid) return;
    setIsLoading(true);

    const audience = { type: obj.audienceType };
    if (obj.audienceType === "groups") audience.groupIds = obj.groupIds;
    if (obj.audienceType === "users") audience.userIds = obj.userIds;
    if (obj.audienceType === "individual") {
      audience.userIds = obj.userIds.slice(0, 1);
    }

    mutate({
      title: obj.title || undefined,
      body: obj.body.trim(),
      templateId: obj.templateId || undefined,
      audience,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <SelectField
        label="Kimga"
        value={obj.audienceType}
        onChange={(v) => obj.setField("audienceType", v)}
        options={audienceOptions}
        disabled={isLoading}
      />

      {obj.audienceType === "groups" && (
        <div>
          <label className="text-sm font-medium block mb-1">Guruhlar</label>
          <GroupsMultiSelect
            value={obj.groupIds}
            onChange={(v) => obj.setField("groupIds", v)}
            disabled={isLoading}
          />
        </div>
      )}

      {(obj.audienceType === "users" || obj.audienceType === "individual") && (
        <div>
          <label className="text-sm font-medium block mb-1">
            Foydalanuvchilar
          </label>
          <UsersMultiSelect
            value={obj.userIds}
            onChange={(v) =>
              obj.setField(
                "userIds",
                obj.audienceType === "individual" ? v.slice(-1) : v,
              )
            }
            defaultRole={ROLES.STUDENT}
            disabled={isLoading}
          />
        </div>
      )}

      <TemplatePicker
        value={obj.templateId}
        onChange={handleTemplateChange}
        disabled={isLoading}
      />

      <InputField
        name="title"
        label="Sarlavha (ixtiyoriy)"
        value={obj.title}
        onChange={(e) => obj.setField("title", e.target.value)}
        disabled={isLoading}
      />

      <div>
        <label className="text-sm font-medium block mb-1">Matn</label>
        <textarea
          rows={5}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Xabar matni..."
          value={obj.body}
          onChange={(e) => obj.setField("body", e.target.value)}
          required
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
        <Button
          type="submit"
          disabled={isLoading || !obj.body.trim() || !audienceValid}
          className="flex-1"
        >
          {isLoading ? "Yuborilmoqda..." : "Yuborish"}
        </Button>
      </div>
    </form>
  );
};

export default SendNotificationModal;
