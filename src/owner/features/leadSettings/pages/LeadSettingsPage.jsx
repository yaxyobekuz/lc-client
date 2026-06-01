import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Switch from "@/shared/components/ui/switch/Switch";
import Button from "@/shared/components/ui/button/Button";
import Card from "@/shared/components/ui/card/Card";
import {
  useLeadSettingsQuery,
  useLeadSettingsUpdateMutation,
} from "../hooks/useLeadSettingsQuery";

const LeadSettingsPage = () => {
  const { data: settings, isLoading } = useLeadSettingsQuery();
  const { mutate, isPending } = useLeadSettingsUpdateMutation();

  const obj = useObjectState({
    reminderEnabled: true,
    remindHourOfDay: 9,
    overdueDaysThreshold: 7,
  });

  useEffect(() => {
    if (settings) {
      obj.setFields({
        reminderEnabled: settings.reminderEnabled,
        remindHourOfDay: settings.remindHourOfDay,
        overdueDaysThreshold: settings.overdueDaysThreshold,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings?._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      reminderEnabled: !!obj.reminderEnabled,
      remindHourOfDay: Number(obj.remindHourOfDay),
      overdueDaysThreshold: Number(obj.overdueDaysThreshold),
    });
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Lid sozlamalari</h1>
        <p className="text-sm text-muted-foreground">
          Follow-up eslatmalari va kechikish chegarasi
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">Eslatmalar</h3>
              <p className="text-xs text-muted-foreground">
                Mas'ul xodimga botda eslatma yuboriladi (linklangan bo'lsa)
              </p>
            </div>
            <Switch
              checked={!!obj.reminderEnabled}
              onChange={(v) => obj.setField("reminderEnabled", v)}
              disabled={isPending}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InputField
              name="remindHourOfDay"
              label="Eslatma soati (0-23)"
              type="number"
              min="0"
              max="23"
              description="Har kuni shu soatda follow-up eslatmalari yuboriladi"
              value={obj.remindHourOfDay}
              onChange={(e) => obj.setField("remindHourOfDay", e.target.value)}
              disabled={isPending}
            />

            <InputField
              name="overdueDaysThreshold"
              label="Kechikkan deb hisoblash (kun)"
              type="number"
              min="1"
              description="Eslatma sanasidan necha kun o'tgach kechikkan deb hisoblanadi"
              value={obj.overdueDaysThreshold}
              onChange={(e) =>
                obj.setField("overdueDaysThreshold", e.target.value)
              }
              disabled={isPending}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LeadSettingsPage;
