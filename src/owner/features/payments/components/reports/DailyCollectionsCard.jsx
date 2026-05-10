import { useState } from "react";
import Card from "@/shared/components/ui/card/Card";
import InputField from "@/shared/components/ui/input/InputField";
import { useDailyCollectionsQuery } from "../../hooks/useReportsQueries";
import { formatMoney } from "@/shared/utils/formatMoney";
import { toDateInput } from "@/shared/utils/formatDate";

const DailyCollectionsCard = () => {
  const [date, setDate] = useState(toDateInput(new Date()));
  const { data } = useDailyCollectionsQuery({ date });

  return (
    <Card>
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="font-semibold">Kun bo'yicha to'lovlar</h3>
        <InputField
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="!gap-0"
          inputClassName="h-9"
        />
      </div>

      {!data ? (
        <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3 pb-3 border-b">
            <div>
              <p className="text-xs text-muted-foreground">Jami yig'ilgan</p>
              <p className="text-xl font-semibold text-green-600">
                {formatMoney(data.total)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">To'lovlar soni</p>
              <p className="text-xl font-semibold">{data.paymentsCount}</p>
            </div>
          </div>

          {data.methods.length === 0 ? (
            <p className="text-sm text-muted-foreground">To'lovlar yo'q</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {data.methods.map((m) => (
                <li
                  key={m.methodId || m.methodName}
                  className="flex items-center justify-between"
                >
                  <span>{m.methodName}</span>
                  <span className="font-medium">
                    {formatMoney(m.amount)} ({m.count})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Card>
  );
};

export default DailyCollectionsCard;
