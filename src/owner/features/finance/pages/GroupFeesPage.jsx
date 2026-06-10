import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import DataTable from "@/shared/components/ui/table/DataTable";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import InputField from "@/shared/components/ui/input/InputField";
import useObjectState from "@/shared/hooks/useObjectState";
import useDebounce from "@/shared/hooks/useDebounce";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { formatMoney } from "@/shared/utils/formatMoney";
import MonthPicker from "../components/MonthPicker";
import GroupFeeEditModal from "../components/modals/GroupFeeEditModal";
import useGroupFeesQuery from "../hooks/useGroupFeesQuery";

const now = new Date();

const GroupFeesPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const filters = useObjectState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    search: "",
  });
  const debouncedSearch = useDebounce(filters.search);

  const { data, isLoading } = useGroupFeesQuery({
    year: filters.year,
    month: filters.month,
    search: debouncedSearch || undefined,
  });

  const rows = data || [];

  const openEdit = (row) =>
    openModal(MODAL.GROUP_FEE_EDIT, {
      groupId: row.group._id,
      groupName: row.group.name,
      year: row.year,
      month: row.month,
      amount: row.amount,
      lockPeriod: true,
    });

  const columns = [
    {
      key: "group",
      header: "Guruh",
      headerClassName: "px-4 py-2.5 text-left text-xs font-medium text-muted-foreground",
      cell: (r) => <span className="font-medium">{r.group.name}</span>,
    },
    {
      key: "amount",
      header: "To'lov miqdori",
      headerClassName: "px-4 py-2.5 text-left text-xs font-medium text-muted-foreground",
      cell: (r) =>
        r.amount == null ? (
          <span className="text-muted-foreground">Belgilanmagan</span>
        ) : (
          <span className="font-medium">{formatMoney(r.amount)}</span>
        ),
    },
    {
      key: "actions",
      header: "",
      headerClassName: "px-4 py-2.5",
      className: "text-right",
      cell: (r) => (
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            openEdit(r);
          }}
          aria-label="Tahrirlash"
        >
          <Pencil className="size-4" />
        </button>
      ),
    },
  ];

  const renderCard = (r) => (
    <div
      className="flex items-center justify-between"
      onClick={() => navigate(`/owner/finance/group-fees/${r.group._id}`)}
    >
      <div>
        <p className="font-medium">{r.group.name}</p>
        <p className="text-sm text-muted-foreground">
          {r.amount == null ? "Belgilanmagan" : formatMoney(r.amount)}
        </p>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          openEdit(r);
        }}
        aria-label="Tahrirlash"
      >
        <Pencil className="size-4 text-muted-foreground" />
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Guruh to'lovi</h1>
          <p className="text-sm text-muted-foreground">
            Har bir guruhning tanlangan oydagi to'lov miqdori
          </p>
        </div>
        <MonthPicker
          year={filters.year}
          month={filters.month}
          onChange={({ year, month }) => filters.setFields({ year, month })}
        />
      </header>

      <InputField
        name="search"
        type="search"
        placeholder="Guruh nomi bo'yicha qidirish..."
        value={filters.search}
        onChange={(e) => filters.setField("search", e.target.value)}
      />

      <DataTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        rowKey={(r) => r.group._id}
        onRowClick={(r) => navigate(`/owner/finance/group-fees/${r.group._id}`)}
        renderCard={renderCard}
      />

      <ModalWrapper name={MODAL.GROUP_FEE_EDIT} title="Guruh to'lovini belgilash">
        <GroupFeeEditModal />
      </ModalWrapper>
    </div>
  );
};

export default GroupFeesPage;
