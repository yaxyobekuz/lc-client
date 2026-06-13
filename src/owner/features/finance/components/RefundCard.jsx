import { Link } from "react-router-dom";
import { Send, Undo2, Phone } from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatPhone } from "@/shared/utils/formatPhone";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const MONTHS = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
];

// Telegram (username yoki ID) - GroupStudentsTable bilan bir xil ko'rinish.
const TelegramLine = ({ telegram }) => {
  if (!telegram) {
    return <span className="text-xs text-gray-300">Telegram bog'lanmagan</span>;
  }
  if (telegram.username) {
    return (
      <a
        href={`https://t.me/${telegram.username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700 hover:underline"
        title={`@${telegram.username}`}
      >
        <Send className="size-3.5 shrink-0" />
        <span className="truncate">@{telegram.username}</span>
      </a>
    );
  }
  return (
    <span
      className="flex min-w-0 items-center gap-1 text-xs font-medium text-emerald-600"
      title={`Telegram ID: ${telegram.telegramId}`}
    >
      <Send className="size-3.5 shrink-0" />
      <span className="truncate">ID: {telegram.telegramId}</span>
    </span>
  );
};

const RefundCard = ({ item }) => {
  const { openModal } = useModal();
  const student = item.student || {};
  const refundable = item.refundable || 0;

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Link
          to={`/owner/finance/student-payments/student/${student._id}`}
          className="min-w-0 rounded-md outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          <p className="truncate font-semibold text-gray-900">
            {student.firstName} {student.lastName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {item.group?.name} · {MONTHS[item.month - 1]} {item.year}
          </p>
        </Link>
        <span className="shrink-0 rounded-full bg-rose-50 px-2.5 py-1 text-sm font-semibold text-rose-600">
          {formatMoney(refundable)}
        </span>
      </div>

      {/* Aloqa: telefon raqami + Telegram */}
      <div className="flex flex-col gap-1.5 border-t border-gray-100 pt-2.5">
        <span
          className="flex min-w-0 items-center gap-1 text-xs text-gray-600"
          title={formatPhone(student.phone) || "-"}
        >
          <Phone className="size-3.5 shrink-0" />
          <span className="truncate">{formatPhone(student.phone) || "Raqam yo'q"}</span>
        </span>
        <TelegramLine telegram={student.telegram} />
      </div>

      {/* To'langan / kutilgan tafsiloti */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>To'langan: {formatMoney(item.paidAmount)}</span>
        <span>Hisoblangan: {formatMoney(item.expectedAmount)}</span>
      </div>

      <Button
        size="sm"
        className="w-full"
        onClick={() => openModal(MODAL.FINANCE_REFUND, { item })}
      >
        <Undo2 className="size-4" />
        Qaytarish
      </Button>
    </Card>
  );
};

export default RefundCard;
