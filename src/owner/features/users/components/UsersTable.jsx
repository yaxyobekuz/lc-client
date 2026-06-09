// Icons
import { KeyRound, Trash2, RotateCcw, ChevronUp, ChevronDown } from "lucide-react";

// Router
import { Link, useNavigate } from "react-router-dom";

// Components
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";

// Hooks
import useModal from "@/shared/hooks/useModal";
import useUserRestoreMutation from "../hooks/useUserRestoreMutation";

// Constants
import { MODAL } from "@/shared/constants/modals";
import { ROLES, ROLE_LABELS } from "@/shared/constants/roles";

// Utils
import { formatPhone } from "@/shared/utils/formatPhone";
import { formatMoney } from "@/shared/utils/formatMoney";

// Foydalanuvchi shu oyda qo'shilganmi? ("Yangi" badge uchun)
const isNewThisMonth = (createdAt) => {
  if (!createdAt) return false;
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  );
};

// Bosiluvchi (saralanadigan) ustun sarlavhasi
const SortableTh = ({ field, sort, order, onSort, children, className = "" }) => {
  const active = sort === field;
  return (
    <th className={"px-4 py-2 font-medium " + className}>
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1 hover:text-primary"
      >
        {children}
        {active &&
          (order === "asc" ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          ))}
      </button>
    </th>
  );
};

const UsersTable = ({
  users = [],
  archived = false,
  role,
  sort,
  order,
  onSort,
}) => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { mutate: restore, isPending: isRestoring } = useUserRestoreMutation();

  // Faqat o'quvchilar ro'yxatida Guruh + Qarz ustunlari ko'rsatiladi
  const isStudent = role === ROLES.STUDENT;
  const canSort = typeof onSort === "function";

  if (users.length === 0) {
    return (
      <div className="border rounded-lg p-10 text-center bg-white">
        <p className="text-muted-foreground">
          {archived
            ? "Arxivda foydalanuvchi yo'q"
            : "Foydalanuvchi topilmadi"}
        </p>
        {!archived && (
          <Button
            className="mt-4"
            onClick={() => openModal(MODAL.USER_CREATE, { defaultRole: role })}
          >
            Yangi foydalanuvchi qo'shish
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">#</th>
            {canSort ? (
              <SortableTh
                field="firstName"
                sort={sort}
                order={order}
                onSort={onSort}
              >
                Ism familiya
              </SortableTh>
            ) : (
              <th className="px-4 py-2 font-medium">Ism familiya</th>
            )}
            <th className="px-4 py-2 font-medium">Telefon</th>
            {isStudent ? (
              <>
                <th className="px-4 py-2 font-medium">Guruh</th>
                {canSort ? (
                  <SortableTh
                    field="debt"
                    sort={sort}
                    order={order}
                    onSort={onSort}
                  >
                    Qarz
                  </SortableTh>
                ) : (
                  <th className="px-4 py-2 font-medium">Qarz</th>
                )}
              </>
            ) : (
              <>
                <th className="px-4 py-2 font-medium">Login</th>
                <th className="px-4 py-2 font-medium">Rol</th>
              </>
            )}
            <th className="px-4 py-2 font-medium">Holat</th>
            <th className="px-4 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr
              key={u._id}
              onClick={() => navigate(`/owner/users/${u._id}`)}
              className="border-t cursor-pointer transition-colors hover:bg-gray-50"
            >
              <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/owner/users/${u._id}`}
                    className="font-medium hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {u.firstName} {u.lastName}
                  </Link>
                  {!archived && isNewThisMonth(u.createdAt) && (
                    <Badge className="bg-sky-100 text-sky-700">Yangi</Badge>
                  )}
                </div>
              </td>
              <td className="px-4 py-2">{formatPhone(u.phone) || "-"}</td>
              {isStudent ? (
                <>
                  <td className="px-4 py-2">
                    {u.activeGroups?.length ? (
                      <div className="flex flex-wrap gap-1">
                        {u.activeGroups.map((g) => (
                          <span
                            key={g._id}
                            className="inline-flex rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700"
                          >
                            {g.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {u.currentDebt > 0 ? (
                      <Badge className="bg-rose-50 text-rose-600">
                        {formatMoney(u.currentDebt)}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 text-muted-foreground">
                    @{u.username}
                  </td>
                  <td className="px-4 py-2">{ROLE_LABELS[u.role] || u.role}</td>
                </>
              )}
              <td className="px-4 py-2">
                {u.isActive ? (
                  <Badge variant="default" className="bg-green-100 text-green-700">
                    Faol
                  </Badge>
                ) : (
                  <Badge variant="outline">Nofaol</Badge>
                )}
              </td>
              <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-end gap-1">
                  {archived ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:bg-green-50 hover:text-green-700"
                      disabled={isRestoring}
                      onClick={() => restore(u._id)}
                      playClickSound={false}
                      aria-label="Tiklash"
                      title="Tiklash"
                    >
                      <RotateCcw className="size-4" />
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          openModal(MODAL.USER_PASSWORD, { user: u })
                        }
                        playClickSound={false}
                        aria-label="Parolni ko'rish"
                        title="Parol"
                      >
                        <KeyRound className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => openModal(MODAL.USER_DELETE, { user: u })}
                        playClickSound={false}
                        aria-label="Foydalanuvchini arxivlash"
                        title="Arxivlash"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
