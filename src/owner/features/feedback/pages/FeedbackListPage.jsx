import { useState } from "react";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import useObjectState from "@/shared/hooks/useObjectState";
import { FEEDBACK_STATUS_OPTIONS } from "@/shared/constants/feedback";

import FeedbackTable from "../components/FeedbackTable";
import FeedbackTypePicker from "../components/FeedbackTypePicker";
import { useFeedbackListQuery } from "../hooks/useFeedbackQueries";

const STATUS_OPTIONS = [
  { value: "", label: "Barcha holatlar" },
  ...FEEDBACK_STATUS_OPTIONS,
];

const FeedbackListPage = () => {
  const filters = useObjectState({
    search: "",
    status: "",
    type: "",
  });
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useFeedbackListQuery({
    search: filters.search || undefined,
    status: filters.status || undefined,
    type: filters.type || undefined,
    page,
    limit,
  });

  const items = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Feedback'lar</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <InputField
          name="search"
          type="search"
          label="Qidirish"
          placeholder="Matn ichidan..."
          value={filters.search}
          onChange={(e) => {
            filters.setField("search", e.target.value);
            setPage(1);
          }}
        />
        <SelectField
          label="Holat"
          value={filters.status}
          onChange={(v) => {
            filters.setField("status", v);
            setPage(1);
          }}
          options={STATUS_OPTIONS}
        />
        <FeedbackTypePicker
          value={filters.type}
          onChange={(v) => {
            filters.setField("type", v);
            setPage(1);
          }}
          includeAll
        />
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <FeedbackTable items={items} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              onPageChange={setPage}
              totalPages={totalPages}
              hasNextPage={page < totalPages}
              hasPrevPage={page > 1}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackListPage;
