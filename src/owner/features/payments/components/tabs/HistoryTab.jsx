import { useState } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import SelectField from "@/shared/components/ui/select/SelectField";
import InvoicesTable from "../InvoicesTable";
import PeriodPicker from "../PeriodPicker";
import useInvoicesQuery from "../../hooks/useInvoicesQuery";

const STATUS_OPTIONS = [
  { value: "", label: "Hammasi" },
  { value: "unpaid", label: "To'lanmagan" },
  { value: "partial", label: "Qisman" },
  { value: "paid", label: "To'langan" },
  { value: "cancelled", label: "Bekor qilingan" },
];

const HistoryTab = () => {
  const now = new Date();
  const filters = useObjectState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    status: "",
  });

  const { data, isLoading } = useInvoicesQuery({
    year: filters.year,
    month: filters.month,
    status: filters.status || undefined,
    limit: 100,
  });

  return (
    <div className="space-y-4 pt-3">
      <div className="flex items-end gap-3 flex-wrap">
        <PeriodPicker
          year={filters.year}
          month={filters.month}
          onChange={(p) => filters.setFields(p)}
        />
        <SelectField
          label="Holat"
          value={filters.status}
          onChange={(v) => filters.setField("status", v)}
          options={STATUS_OPTIONS}
          className="!gap-1 w-44"
        />
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>
      ) : (
        <InvoicesTable items={data?.data || []} />
      )}
    </div>
  );
};

export default HistoryTab;
