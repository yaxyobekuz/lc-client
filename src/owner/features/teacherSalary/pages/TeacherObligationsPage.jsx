import { useMemo } from "react";
import SelectField from "@/shared/components/ui/select/SelectField";
import SelectYear from "@/shared/components/ui/select/SelectYear";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import { formatMoney } from "@/shared/utils/formatMoney";
import { MONTH_OPTIONS } from "@/shared/constants/calendar";
import useObjectState from "@/shared/hooks/useObjectState";
import useGroupsListQuery from "@/owner/features/groups/hooks/useGroupsListQuery";
import ObligationsTable from "../components/ObligationsTable";
import useObligationsQuery from "../hooks/useObligationsQuery";

const now = new Date();

const MONTH_FILTER_OPTIONS = [
  { value: "", label: "Barcha oylar" },
  ...MONTH_OPTIONS.map((o) => ({ value: String(o.value), label: o.label })),
];

const TeacherObligationsPage = () => {
  const filters = useObjectState({
    groupId: "",
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const { data: groupsData } = useGroupsListQuery({ limit: 200 });
  const groupOptions = useMemo(
    () => [
      { value: "", label: "Barcha guruhlar" },
      ...(groupsData?.data || []).map((g) => ({ value: g._id, label: g.name })),
    ],
    [groupsData],
  );

  const allMonths = filters.month === "";

  const { data, isLoading } = useObligationsQuery({
    groupId: filters.groupId || undefined,
    year: filters.year,
    month: allMonths ? undefined : filters.month,
  });

  const rows = data || [];
  const totalRemaining = rows.reduce((s, r) => s + (r.remaining || 0), 0);

  return (
    <div className="space-y-4">
      <header>
        <p className="text-sm text-muted-foreground">
          O'qituvchilarga to'lanishi kerak bo'lgan qoldiq
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SelectYear
          label="Yil"
          value={filters.year}
          onChange={(v) => filters.setField("year", Number(v))}
        />
        <SelectField
          label="Oy"
          value={String(filters.month)}
          onChange={(v) => filters.setField("month", v === "" ? "" : Number(v))}
          options={MONTH_FILTER_OPTIONS}
        />
        <SelectField
          searchable
          label="Guruh"
          value={filters.groupId}
          onChange={(v) => filters.setField("groupId", v)}
          options={groupOptions}
        />
        {!isLoading && rows.length > 0 && (
          <div className="flex items-end">
            <p className="text-sm">
              Umumiy majburiyat:{" "}
              <span className="font-semibold text-rose-600">{formatMoney(totalRemaining)}</span>
            </p>
          </div>
        )}
      </div>

      {!isLoading && rows.length === 0 ? (
        <EmptyState title="Qarzdorlik yo'q" description="Tanlangan davr uchun barcha maoshlar to'langan" />
      ) : (
        <ObligationsTable rows={rows} isLoading={isLoading} showMonth={allMonths} />
      )}
    </div>
  );
};

export default TeacherObligationsPage;
