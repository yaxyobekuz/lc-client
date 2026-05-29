// Icons
import { Trash2 } from "lucide-react";

// Router
import { Link } from "react-router-dom";

// Components
import Badge from "@/shared/components/ui/badge/Badge";
import Button from "@/shared/components/ui/button/Button";

// Hooks
import useModal from "@/shared/hooks/useModal";

// Constants
import { MODAL } from "@/shared/constants/modals";
import { ROLE_LABELS } from "@/shared/constants/roles";

// Utils
import { formatPhone } from "@/shared/utils/formatPhone";

const UsersTable = ({ users = [] }) => {
  const { openModal } = useModal();

  if (users.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Foydalanuvchi topilmadi
      </div>
    );
  }

  return (
    <div className="border rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm">
        <thead className=" text-left">
          <tr>
            <th className="px-4 py-2 font-medium">#</th>
            <th className="px-4 py-2 font-medium">Ism familiya</th>
            <th className="px-4 py-2 font-medium">Telefon</th>
            <th className="px-4 py-2 font-medium">Login</th>
            <th className="px-4 py-2 font-medium">Rol</th>
            <th className="px-4 py-2 font-medium">Holat</th>
            <th className="px-4 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u._id} className="border-t">
              <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/owner/users/${u._id}`}
                  className="hover:underline font-medium"
                >
                  {u.firstName} {u.lastName}
                </Link>
              </td>
              <td className="px-4 py-2">{formatPhone(u.phone) || "-"}</td>
              <td className="px-4 py-2 text-muted-foreground">@{u.username}</td>
              <td className="px-4 py-2">{ROLE_LABELS[u.role] || u.role}</td>
              <td className="px-4 py-2">
                {u.isActive ? (
                  <Badge variant="default" className="bg-green-100 text-green-700">
                    Faol
                  </Badge>
                ) : (
                  <Badge variant="outline">Nofaol</Badge>
                )}
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => openModal(MODAL.USER_DELETE, { user: u })}
                    playClickSound={false}
                    aria-label="Foydalanuvchini o'chirish"
                    title="O'chirish"
                  >
                    <Trash2 className="size-4" />
                  </Button>
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
