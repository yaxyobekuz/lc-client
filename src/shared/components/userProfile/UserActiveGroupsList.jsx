import { Link } from "react-router-dom";
import { ArrowRightLeft, Trash2 } from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { formatSchedule } from "@/shared/utils/formatSchedule";
import { formatDateUz } from "@/shared/utils/formatDate";

const UserActiveGroupsList = ({
  studentId,
  activeGroups = [],
  readonly = false,
  ownerLinks = false,
}) => {
  const { openModal } = useModal();

  return (
    <Card>
      <h3 className="font-semibold mb-3">Hozirgi guruhlar</h3>
      {activeGroups.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Hech qaysi guruhga biriktirilmagan
        </p>
      ) : (
        <div className="space-y-2">
          {activeGroups.map((m) => {
            const g = m.group;
            return (
              <div
                key={m.membershipId || g._id}
                className="flex items-start justify-between gap-3 p-3 border rounded-lg"
              >
                <div className="min-w-0 flex-1">
                  {ownerLinks ? (
                    <Link
                      to={`/owner/groups/${g._id}`}
                      className="font-medium hover:underline"
                    >
                      {g.name}
                    </Link>
                  ) : (
                    <p className="font-medium">{g.name}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {formatSchedule(g.schedule)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Qo'shilgan: {formatDateUz(m.joinedAt)}
                  </p>
                </div>
                {!readonly && (
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        openModal(MODAL.GROUP_TRANSFER_STUDENT, {
                          groupId: g._id,
                          student: { _id: studentId },
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
                      className="text-red-600 hover:text-red-700"
                      onClick={() =>
                        openModal(MODAL.GROUP_REMOVE_STUDENT, {
                          groupId: g._id,
                          studentId,
                          groupName: g.name,
                        })
                      }
                      playClickSound={false}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default UserActiveGroupsList;
