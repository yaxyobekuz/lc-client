import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import Switch from "@/shared/components/ui/switch/Switch";
import Card from "@/shared/components/ui/card/Card";
import usePaymentSettingsUpdateMutation from "../hooks/usePaymentSettingsUpdateMutation";

const ABSENCE_MODES = [
  { value: "auto", label: "Avtomatik (oylik narx / darslar soni)" },
  { value: "fixed", label: "Belgilangan summa" },
  { value: "none", label: "Ayirilmasin (0)" },
];

const PaymentSettingsForm = ({ settings }) => {
  const obj = useObjectState({
    dueDayOfMonth: settings?.dueDayOfMonth ?? 10,
    remindBeforeDays: settings?.remindBeforeDays ?? 3,
    repeatAfterOverdueDays: settings?.repeatAfterOverdueDays ?? 3,
    reminderEnabled: settings?.reminderEnabled ?? true,
    centerName: settings?.centerName ?? "Bayyina",
    teacherAbsenceMode: settings?.teacherAbsenceMode ?? "auto",
    teacherAbsenceAmount: settings?.teacherAbsenceAmount ?? 0,
  });

  useEffect(() => {
    if (settings) {
      obj.setFields({
        dueDayOfMonth: settings.dueDayOfMonth,
        remindBeforeDays: settings.remindBeforeDays,
        repeatAfterOverdueDays: settings.repeatAfterOverdueDays,
        reminderEnabled: settings.reminderEnabled,
        centerName: settings.centerName,
        teacherAbsenceMode: settings.teacherAbsenceMode ?? "auto",
        teacherAbsenceAmount: settings.teacherAbsenceAmount ?? 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings?._id]);

  const { mutate, isPending } = usePaymentSettingsUpdateMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      dueDayOfMonth: Number(obj.dueDayOfMonth),
      remindBeforeDays: Number(obj.remindBeforeDays),
      repeatAfterOverdueDays: Number(obj.repeatAfterOverdueDays),
      reminderEnabled: !!obj.reminderEnabled,
      centerName: obj.centerName,
      teacherAbsenceMode: obj.teacherAbsenceMode,
      teacherAbsenceAmount: Number(obj.teacherAbsenceAmount) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid items-start gap-4 lg:grid-cols-2">
      <Card className="space-y-3">
        <h3 className="font-semibold">Umumiy</h3>
        <InputField
          name="centerName"
          label="Markaz nomi (chek uchun)"
          value={obj.centerName}
          onChange={(e) => obj.setField("centerName", e.target.value)}
          required
          disabled={isPending}
        />
        <InputField
          name="dueDayOfMonth"
          label="To'lov muddati (oyning kuni)"
          type="number"
          min="1"
          max="28"
          description="1 dan 28 gacha"
          value={obj.dueDayOfMonth}
          onChange={(e) => obj.setField("dueDayOfMonth", e.target.value)}
          required
          disabled={isPending}
        />
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Telegram eslatmalari</h3>
          <Switch
            checked={obj.reminderEnabled}
            onChange={(v) => obj.setField("reminderEnabled", v)}
            disabled={isPending}
          />
        </div>
        <InputField
          name="remindBeforeDays"
          label="Necha kun oldin eslatish"
          type="number"
          min="0"
          value={obj.remindBeforeDays}
          onChange={(e) => obj.setField("remindBeforeDays", e.target.value)}
          disabled={isPending || !obj.reminderEnabled}
        />
        <InputField
          name="repeatAfterOverdueDays"
          label="Muddat o'tgandan keyin necha kunda takror"
          type="number"
          min="0"
          description="0 - takrorlanmasin"
          value={obj.repeatAfterOverdueDays}
          onChange={(e) => obj.setField("repeatAfterOverdueDays", e.target.value)}
          disabled={isPending || !obj.reminderEnabled}
        />
      </Card>

      <Card className="space-y-3 lg:col-span-2">
        <h3 className="font-semibold">O'qituvchi kelmagan kun</h3>
        <p className="text-sm text-muted-foreground">
          O'qituvchi darsga kelmasa, o'quvchining shu oygi hisobidan 1 dars haqi
          ayiriladi. Bu — global qiymat; har bir guruhda alohida o'rnatish mumkin.
        </p>
        <SelectField
          label="Hisoblash usuli"
          value={obj.teacherAbsenceMode}
          onChange={(v) => obj.setField("teacherAbsenceMode", v)}
          options={ABSENCE_MODES}
          disabled={isPending}
        />
        {obj.teacherAbsenceMode === "fixed" && (
          <InputField
            name="teacherAbsenceAmount"
            label="1 dars uchun summa"
            type="number"
            min="0"
            value={obj.teacherAbsenceAmount}
            onChange={(e) => obj.setField("teacherAbsenceAmount", e.target.value)}
            disabled={isPending}
          />
        )}
      </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentSettingsForm;
