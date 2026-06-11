// React
import { useMemo } from "react";

// Icons
import { CheckCircle2, Users, CalendarDays, Wallet } from "lucide-react";

// Components
import Card from "@/shared/components/ui/card/Card";
import { cn } from "@/shared/utils/cn";

// Utils
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz } from "@/shared/utils/formatDate";
import { computeTotals } from "../utils/buildPayload";

const studentName = (r, idx) =>
  r.existingStudentId
    ? r.existingLabel || `O'quvchi ${idx + 1}`
    : `${r.firstName} ${r.lastName}`.trim() || `O'quvchi ${idx + 1}`;

const Step4Review = ({ group, students, months, payments, result }) => {
  const totals = useMemo(
    () => computeTotals({ group, students, payments }, months),
    [group, students, payments, months],
  );

  // Import muvaffaqiyatli tugagach - server'ning ANIQ raqamlari (perStudent).
  if (result) {
    const s = result.summary || {};
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle2 className="size-6 shrink-0" />
          <div>
            <div className="font-semibold">Import muvaffaqiyatli yakunlandi</div>
            <div className="text-sm">
              {result.group?.name} guruhi yaratildi.
              {result.duplicate && " (bu import allaqachon bajarilgan edi)"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Mini label="Yangi o'quvchi" value={s.studentsCreated ?? 0} />
          <Mini label="Bog'langan" value={s.studentsLinked ?? 0} />
          <Mini label="To'lov yozuvi" value={s.paymentsCreated ?? 0} />
          <Mini label="Yig'ilgan" value={formatMoney(s.totalCollected ?? 0)} />
        </div>

        <Card title="O'quvchilar bo'yicha qarz (server hisobi)">
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2">O'quvchi</th>
                  <th className="py-2 text-right">Kutilgan</th>
                  <th className="py-2 text-right">To'langan</th>
                  <th className="py-2 text-right">Qarz</th>
                </tr>
              </thead>
              <tbody>
                {(result.students || []).map((row, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-1.5">{studentName(students[idx] || {}, idx)}</td>
                    <td className="py-1.5 text-right">{formatMoney(row.expected)}</td>
                    <td className="py-1.5 text-right">{formatMoney(row.collected)}</td>
                    <td className={cn("py-1.5 text-right font-medium", row.debt > 0 ? "text-red-600" : "text-emerald-600")}>
                      {formatMoney(row.debt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  // Import oldidan - ko'rib chiqish.
  const newCount = students.filter((r) => !r.existingStudentId).length;
  const linkedCount = students.length - newCount;

  return (
    <div className="space-y-4">
      <Card title="Guruh">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-sm">
          <Field icon={CalendarDays} label="Nom" value={group.name} />
          <Field icon={CalendarDays} label="Boshlanish" value={formatDateUz(group.startDate)} />
          <Field icon={CalendarDays} label="Davomiyligi" value={`${group.durationMonths} oy`} />
          <Field icon={Wallet} label="Oylik narx" value={formatMoney(group.monthlyPrice)} />
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Mini label="Jami o'quvchi" value={students.length} icon={Users} />
        <Mini label="Yangi / Bog'langan" value={`${newCount} / ${linkedCount}`} />
        <Mini label="Tarixiy oylar" value={months.length} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Mini label="Yig'iladigan to'lov" value={formatMoney(totals.collected)} tone="emerald" />
        <Mini label="Kutilgan (taxminiy)" value={formatMoney(totals.expected)} />
        <Mini label="Qarz (taxminiy)" value={formatMoney(totals.debt)} tone="red" />
      </div>

      <p className="text-sm text-muted-foreground">
        "Tasdiqlash va import qilish" tugmasini bossangiz — guruh, o'quvchilar va
        tarixiy to'lovlar bitta amalda (to'liq yoki umuman) yaratiladi.
      </p>
    </div>
  );
};

const Field = ({ icon: Icon, label, value }) => (
  <div>
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      {Icon && <Icon className="size-3.5" />} {label}
    </div>
    <div className="font-medium text-gray-900 truncate">{value || "-"}</div>
  </div>
);

const Mini = ({ label, value, tone, icon: Icon }) => (
  <div
    className={cn(
      "rounded-md border px-4 py-3",
      tone === "emerald"
        ? "border-emerald-200 bg-emerald-50"
        : tone === "red"
          ? "border-red-200 bg-red-50"
          : "bg-gray-50",
    )}
  >
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      {Icon && <Icon className="size-3.5" />} {label}
    </div>
    <div className="text-lg font-semibold text-gray-900">{value}</div>
  </div>
);

export default Step4Review;
