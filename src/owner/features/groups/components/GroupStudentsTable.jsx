// Router
import { Link } from "react-router-dom";

// Icons
import { ArrowRightLeft, Trash2, Check, Send } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import { useInvoicesQuery } from "@/owner/features/payments";

// Hooks
import useModal from "@/shared/hooks/useModal";

// Constants
import { MODAL } from "@/shared/constants/modals";

// Utils
import { formatPhone } from "@/shared/utils/formatPhone";
import { formatMoney } from "@/shared/utils/formatMoney";

const GroupStudentsTable = ({ group }) => {
  const { openModal } = useModal();

  const students = group?.students || [];

  // Joriy oy hisoblari (o'quvchi bo'yicha)
  const now = new Date();
  const { data: invoicesRes } = useInvoicesQuery({
    groupId: group?._id,
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    limit: 500,
  });
  const invoiceByStudent = (invoicesRes?.data || []).reduce((acc, inv) => {
    const sid = inv.student?._id || inv.student;
    if (sid) acc[sid] = inv;
    return acc;
  }, {});

  if (students.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Guruhda hali o'quvchi yo'q
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 overflow-x-auto bg-white">
      <table className="w-full min-w-[940px] table-fixed text-sm">
        <colgroup>
          <col className="w-12" />
          <col className="w-[18%]" />
          <col className="w-[15%]" />
          <col className="w-[11%]" />
          <col className="w-[13%]" />
          <col className="w-[17%]" />
          <col className="w-[11%]" />
          <col className="w-[15%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-400">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Ism familiya</th>
            <th className="px-4 py-3">Telefon</th>
            <th className="px-4 py-3">Login</th>
            <th className="px-4 py-3">Telegram</th>
            <th className="px-4 py-3">Bu oy to'lovi</th>
            <th className="px-4 py-3 text-right">Qarz</th>
            <th className="px-4 py-3 text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((s, i) => {
            const inv = invoiceByStudent[s._id];
            const debt = inv
              ? Math.max(0, (inv.totalDue || 0) - (inv.paidAmount || 0))
              : 0;
            return (
            <tr key={s._id} className="transition-colors hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-400">{i + 1}</td>
              <td className="px-4 py-3">
                <Link
                  to={`/owner/users/${s._id}`}
                  className="block truncate font-medium text-sky-700 hover:text-sky-800 hover:underline"
                  title={`${s.firstName} ${s.lastName}`}
                >
                  {s.firstName} {s.lastName}
                </Link>
                {s.balance > 0 && (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
                    Balans: {formatMoney(s.balance)}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-600 tabular-nums">
                <span
                  className="block truncate"
                  title={formatPhone(s.phone) || "-"}
                >
                  {formatPhone(s.phone) || "-"}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                <span className="block truncate" title={`@${s.username}`}>
                  @{s.username}
                </span>
              </td>
              <td className="px-4 py-3">
                {s.telegram ? (
                  s.telegram.username ? (
                    <a
                      href={`https://t.me/${s.telegram.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 items-center gap-1 font-medium text-sky-600 hover:text-sky-700 hover:underline"
                      title={`@${s.telegram.username}`}
                    >
                      <Send className="size-3.5 shrink-0" />
                      <span className="truncate">@{s.telegram.username}</span>
                    </a>
                  ) : (
                    <span
                      className="flex min-w-0 items-center gap-1 font-medium text-emerald-600"
                      title={`Telegram ID: ${s.telegram.telegramId}`}
                    >
                      <Send className="size-3.5 shrink-0" />
                      <span className="truncate">Bog'langan</span>
                    </span>
                  )
                ) : (
                  <span className="text-gray-300">Bog'lanmagan</span>
                )}
              </td>
              <td className="px-4 py-3">
                {!inv ? (
                  <span className="text-gray-300">Hisob yo'q</span>
                ) : inv.status === "paid" ? (
                  <span className="inline-flex items-center gap-1 font-medium text-green-600">
                    <Check className="size-3.5" />
                    To'landi
                  </span>
                ) : inv.status === "cancelled" ? (
                  <span className="text-gray-300">Bekor qilingan</span>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    title="To'liq summani to'langan deb belgilash"
                    className="border-green-200 text-green-700 hover:border-green-300 hover:bg-green-50 hover:text-green-800"
                    onClick={() =>
                      openModal(MODAL.PAYMENT_RECORD, { invoice: inv })
                    }
                    playClickSound={false}
                  >
                    <Check className="size-3.5" />
                    To'lash
                  </Button>
                )}
              </td>
              <td className="px-4 py-3 text-right tabular-nums font-medium">
                {debt > 0 ? (
                  <span className="text-rose-500">{formatMoney(debt)}</span>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      openModal(MODAL.GROUP_TRANSFER_STUDENT, {
                        groupId: group._id,
                        student: s,
                      })
                    }
                    playClickSound={false}
                  >
                    <ArrowRightLeft className="size-4" />
                    Ko'chirish
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() =>
                      openModal(MODAL.GROUP_REMOVE_STUDENT, {
                        groupId: group._id,
                        student: s,
                      })
                    }
                    playClickSound={false}
                    aria-label="O'quvchini guruhdan chiqarish"
                  >
                    <Trash2 className="size-4" />
                    Chiqarish
                  </Button>
                </div>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GroupStudentsTable;
