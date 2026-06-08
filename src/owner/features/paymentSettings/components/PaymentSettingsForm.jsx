import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Button from "@/shared/components/ui/button/Button";
import Switch from "@/shared/components/ui/switch/Switch";
import Card from "@/shared/components/ui/card/Card";
import usePaymentSettingsUpdateMutation from "../hooks/usePaymentSettingsUpdateMutation";

const PRICE_CHANGE_OPTIONS = [
  { value: "future_only", label: "Faqat keyingi oydan" },
  { value: "current_unpaid", label: "Bu oy to'lamaganlarga ham" },
  { value: "include_paid", label: "To'laganlarga ham (farq qarz/qaytarish)" },
];

const PRICE_CHANGE_HINTS = {
  future_only:
    "Joriy oy hisoblari o'zgarmaydi — yangi narx faqat keyingi oydan ishlaydi.",
  current_unpaid:
    "Joriy oyning to'lanmagan hisoblari yangi narxga o'tadi. Allaqachon to'laganlar himoyalangan (qarz yozilmaydi).",
  include_paid:
    "To'langan hisoblar ham yangilanadi: narx oshsa farq qarz bo'ladi, kamaysa ortig'i o'quvchi balansiga qaytadi.",
};

const PaymentSettingsForm = ({ settings }) => {
  const obj = useObjectState({
    dueDayOfMonth: settings?.dueDayOfMonth ?? 10,
    remindBeforeDays: settings?.remindBeforeDays ?? 3,
    repeatAfterOverdueDays: settings?.repeatAfterOverdueDays ?? 3,
    reminderEnabled: settings?.reminderEnabled ?? true,
    centerName: settings?.centerName ?? "Bayyina",
    groupPriceChangeMode: settings?.groupPriceChangeMode ?? "current_unpaid",
  });

  useEffect(() => {
    if (settings) {
      obj.setFields({
        dueDayOfMonth: settings.dueDayOfMonth,
        remindBeforeDays: settings.remindBeforeDays,
        repeatAfterOverdueDays: settings.repeatAfterOverdueDays,
        reminderEnabled: settings.reminderEnabled,
        centerName: settings.centerName,
        groupPriceChangeMode: settings.groupPriceChangeMode ?? "current_unpaid",
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
      groupPriceChangeMode: obj.groupPriceChangeMode,
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
      </div>

      <Card className="space-y-3">
        <div>
          <h3 className="font-semibold">Guruh narxi o'zgarganda</h3>
          <p className="text-sm text-muted-foreground">
            Guruh oylik narxini oy o'rtasida o'zgartirganingizda joriy oy
            hisoblariga qanday ta'sir qilsin.
          </p>
        </div>
        <SelectField
          label="Joriy oy hisoblariga ta'siri"
          value={obj.groupPriceChangeMode}
          onChange={(v) => obj.setField("groupPriceChangeMode", v)}
          options={PRICE_CHANGE_OPTIONS}
          disabled={isPending}
        />
        <p className="rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          {PRICE_CHANGE_HINTS[obj.groupPriceChangeMode]}
        </p>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentSettingsForm;
