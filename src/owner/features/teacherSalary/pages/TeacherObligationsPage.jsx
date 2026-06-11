import { useMemo } from "react";
import SelectField from "@/shared/components/ui/select/SelectField";
import EmptyState from "@/shared/components/ui/feedback/EmptyState";
import { formatMoney } from "@/shared/utils/formatMoney";
import useObjectState from "@/shared/hooks/useObjectState";
import useGroupsListQuery from "@/owner/features/groups/hooks/useGroupsListQuery";
import MonthPicker from "../components/MonthPicker";
import ObligationsTable from "../components/ObligationsTable";
import useObligationsQuery from "../hooks/useObligationsQuery";

const now = new Date();

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

  const { data, isLoading } = useObligationsQuery({
    groupId: filters.groupId || undefined,
    year: filters.year,
    month: filters.month,
  });

  const rows = data || [];
  const totalRemaining = rows.reduce((s, r) => s + (r.remaining || 0), 0);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Qarzdorliklar</h1>
          <p className="text-sm text-muted-foreground">
            O'qituvchilarga to'lanishi kerak bo'lgan qoldiq
          </p>
        </div>
        <MonthPicker
          year={filters.year}
          month={filters.month}
          onChange={({ year, month }) => filters.setFields({ year, month })}
        />
      </header>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-xs flex-1">
          <SelectField
            searchable
            label="Guruh"
            value={filters.groupId}
            onChange={(v) => filters.setField("groupId", v)}
            options={groupOptions}
          />
        </div>
        {!isLoading && rows.length > 0 && (
          <p className="text-sm">
            Umumiy majburiyat:{" "}
            <span className="font-semibold text-rose-600">{formatMoney(totalRemaining)}</span>
          </p>
        )}
      </div>

      {!isLoading && rows.length === 0 ? (
        <EmptyState title="Qarzdorlik yo'q" description="Barcha maoshlar to'langan" />
      ) : (
        <ObligationsTable rows={rows} isLoading={isLoading} />
      )}
    </div>
  );
};

export default TeacherObligationsPage;
