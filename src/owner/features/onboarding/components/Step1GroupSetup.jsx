// Icons
import { Info } from "lucide-react";

// Components
import InputField from "@/shared/components/ui/input/InputField";
import Card from "@/shared/components/ui/card/Card";
import GroupScheduleField from "@/owner/features/groups/components/GroupScheduleField";
import TeacherSinglePicker from "@/owner/features/groups/components/TeacherSinglePicker";

// Utils
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatDateUz, todayInput } from "@/shared/utils/formatDate";

// startDate + durationMonths dan kutilgan tugash sanasini hisoblaydi.
const expectedEnd = (startDate, durationMonths) => {
  if (!startDate || !durationMonths) return null;
  const d = new Date(startDate);
  if (Number.isNaN(d.getTime())) return null;
  d.setMonth(d.getMonth() + Number(durationMonths));
  return d;
};

const Step1GroupSetup = ({ group, months, onChange }) => {
  const elapsed = months.length;
  // O'tmishda boshlangan: boshlanish oyidan keyin yana oy(lar) o'tgan
  // (months oxirgi oygacha barcha o'tgan oylarni qaytaradi - >1 → o'tmish).
  const isPast = group.startDate && elapsed > 1;
  const remaining = group.durationMonths
    ? Math.max(0, Number(group.durationMonths) - elapsed)
    : null;
  const endDate = expectedEnd(group.startDate, group.durationMonths);

  return (
    <div className="space-y-4">
      <Card title="Guruh ma'lumotlari">
        <div className="space-y-3 mt-3">
          <InputField
            name="name"
            label="Guruh nomi"
            placeholder="Masalan: Frontend"
            value={group.name}
            onChange={(e) => onChange({ name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <InputField
              type="date"
              name="startDate"
              label="Boshlanish sanasi"
              max={todayInput()}
              value={group.startDate}
              onChange={(e) => onChange({ startDate: e.target.value })}
              required
            />
            <InputField
              type="number"
              name="durationMonths"
              label="Kurs davomiyligi (oy)"
              placeholder="Masalan: 5"
              min="1"
              value={group.durationMonths}
              onChange={(e) => onChange({ durationMonths: e.target.value })}
              required
            />
            <InputField
              type="number"
              name="monthlyPrice"
              label="Oylik narx (so'm)"
              placeholder="500000"
              min="0"
              value={group.monthlyPrice}
              onChange={(e) => onChange({ monthlyPrice: e.target.value })}
              required
            />
          </div>

          {/* O'tmishdagi sana tanlanganda ma'lumot banneri */}
          {isPast && (
            <div className="flex items-start gap-2 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
              <Info className="size-4 mt-0.5 shrink-0" />
              <span>
                Bu guruh <b>{elapsed - 1} oy oldin</b> boshlangan — 3-qadamda
                o'tgan oylar uchun to'lovlarni belgilashingiz mumkin bo'ladi.
              </span>
            </div>
          )}

          {/* Avto-hisob */}
          {group.startDate && group.durationMonths && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              <Stat label="O'tgan oylar" value={elapsed} />
              <Stat label="Qolgan oylar" value={remaining} />
              <Stat
                label="Kutilgan tugash"
                value={endDate ? formatDateUz(endDate) : "-"}
              />
              <Stat
                label="Oylik narx"
                value={group.monthlyPrice ? formatMoney(group.monthlyPrice) : "-"}
              />
            </div>
          )}
        </div>
      </Card>

      <Card title="Jadval va o'qituvchi (ixtiyoriy)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <GroupScheduleField
            value={group.schedule}
            onChange={(next) => onChange({ schedule: next })}
          />
          <TeacherSinglePicker
            value={group.teacherId}
            onChange={(id) => onChange({ teacherId: id })}
          />
        </div>
      </Card>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="rounded-md border bg-gray-50 px-3 py-2">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="font-semibold text-gray-900">{value ?? "-"}</div>
  </div>
);

export default Step1GroupSetup;
