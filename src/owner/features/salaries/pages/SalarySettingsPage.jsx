import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import InputField from "@/shared/components/ui/input/InputField";
import Switch from "@/shared/components/ui/switch/Switch";
import Button from "@/shared/components/ui/button/Button";
import Card from "@/shared/components/ui/card/Card";
import {
  useSalarySettingsQuery,
  useSalarySettingsUpdateMutation,
} from "../hooks/useSalarySettingsQuery";

const SalarySettingsPage = () => {
  const { data: settings, isLoading } = useSalarySettingsQuery();
  const { mutate, isPending } = useSalarySettingsUpdateMutation();

  const obj = useObjectState({
    defaultHoursPerSession: 2,
    autoCalculateOnDay: 1,
    notifyOnCalculated: true,
    notifyOnPaid: true,
  });

  useEffect(() => {
    if (settings) {
      obj.setFields({
        defaultHoursPerSession: settings.defaultHoursPerSession,
        autoCalculateOnDay: settings.autoCalculateOnDay,
        notifyOnCalculated: settings.notifyOnCalculated,
        notifyOnPaid: settings.notifyOnPaid,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings?._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      defaultHoursPerSession: Number(obj.defaultHoursPerSession),
      autoCalculateOnDay: Number(obj.autoCalculateOnDay),
      notifyOnCalculated: !!obj.notifyOnCalculated,
      notifyOnPaid: !!obj.notifyOnPaid,
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
        <h1 className="text-2xl font-semibold">Maosh sozlamalari</h1>
        <p className="text-sm text-muted-foreground">
          Avto hisoblash kuni va bot bildirishnomalari
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid items-start gap-4 lg:grid-cols-2">
        <Card className="space-y-3">
          <h3 className="font-semibold">Avto hisoblash</h3>
          <InputField
            name="autoCalculateOnDay"
            label="Hisoblash kuni (oyning kuni)"
            type="number"
            min="1"
            max="28"
            description="Har oyning bu kunida o'tgan oy uchun avto hisoblanadi"
            value={obj.autoCalculateOnDay}
            onChange={(e) =>
              obj.setField("autoCalculateOnDay", e.target.value)
            }
            disabled={isPending}
          />
          <InputField
            name="defaultHoursPerSession"
            label="Bir darsdagi default soatlar"
            type="number"
            min="0"
            step="0.5"
            description="Stavka yaratilganda default ravishda qo'yiladi"
            value={obj.defaultHoursPerSession}
            onChange={(e) =>
              obj.setField("defaultHoursPerSession", e.target.value)
            }
            disabled={isPending}
          />
        </Card>

        <Card className="space-y-3">
          <h3 className="font-semibold">Bot bildirishnomalari</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Hisoblanganda xabar</p>
              <p className="text-xs text-muted-foreground">
                Maosh hisoblangach o'qituvchiga botda xabar yuboriladi
              </p>
            </div>
            <Switch
              checked={!!obj.notifyOnCalculated}
              onChange={(v) => obj.setField("notifyOnCalculated", v)}
              disabled={isPending}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">To'lab berilganda xabar</p>
              <p className="text-xs text-muted-foreground">
                Har to'lov yozilganda o'qituvchiga botda xabar yuboriladi
              </p>
            </div>
            <Switch
              checked={!!obj.notifyOnPaid}
              onChange={(v) => obj.setField("notifyOnPaid", v)}
              disabled={isPending}
            />
          </div>
        </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SalarySettingsPage;
