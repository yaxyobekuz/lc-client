import { useState } from "react";

// Components
import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";

// Hooks
import useObjectState from "@/shared/hooks/useObjectState";
import useRatingSettingsQuery from "../hooks/useRatingSettingsQuery";
import useRatingSettingsMutation from "../hooks/useRatingSettingsMutation";

const RatingSettingsPage = () => {
  const { data, isLoading } = useRatingSettingsQuery();
  // Foizda ko'rsatamiz (0..100), serverga 0..1 yuboramiz
  const { gradePct, attPct, setField, setFields } = useObjectState({
    gradePct: 70,
    attPct: 30,
  });

  // Server ma'lumoti kelganda formani bir marta to'ldiramiz (render paytida,
  // effect ichida setState chaqirmasdan — React tavsiyasi).
  const [lastData, setLastData] = useState(null);
  if (data && data !== lastData) {
    setLastData(data);
    setFields({
      gradePct: Math.round((data.gradeWeight ?? 0.7) * 100),
      attPct: Math.round((data.attendanceWeight ?? 0.3) * 100),
    });
  }

  const { mutate, isPending } = useRatingSettingsMutation();

  const total = Number(gradePct) + Number(attPct);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      gradeWeight: Number(gradePct) / 100,
      attendanceWeight: Number(attPct) / 100,
    });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Baholash sozlamalari</h1>

      <Card className="max-w-xl space-y-4">
        <p className="text-sm text-muted-foreground">
          Reyting balli ikki qismdan iborat: o'rtacha baho va davomat foizi. Har
          birining vaznini (ta'sirini) shu yerda belgilang. Tavsiya: yig'indisi 100%.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="number"
            min={0}
            max={100}
            name="gradePct"
            label="Baho vazni (%)"
            value={gradePct}
            onChange={(e) => setField("gradePct", e.target.value)}
            disabled={isPending}
          />
          <InputField
            type="number"
            min={0}
            max={100}
            name="attPct"
            label="Davomat vazni (%)"
            value={attPct}
            onChange={(e) => setField("attPct", e.target.value)}
            disabled={isPending}
          />

          <p
            className={
              total === 100
                ? "text-xs text-muted-foreground"
                : "text-xs text-amber-600"
            }
          >
            Yig'indi: {total}%{total !== 100 ? " (100% bo'lishi tavsiya etiladi)" : ""}
          </p>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RatingSettingsPage;
