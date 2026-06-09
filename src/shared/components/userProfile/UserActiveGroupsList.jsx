import { Link } from "react-router-dom";
import { ArrowRightLeft, CalendarDays, Trash2, Users } from "lucide-react";
import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { formatDateUz } from "@/shared/utils/formatDate";
import GroupScheduleLines from "./GroupScheduleLines";

const UserActiveGroupsList = ({
  studentId,
  activeGroups = [],
  readonly = false,
  ownerLinks = false,
}) => {
  const { openModal } = useModal();

  return (
    <Card className="rounded-2xl border-border/60 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <Users className="size-4 text-muted-foreground" />
          Hozirgi guruhlar
        </h3>
        {activeGroups.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {activeGroups.length} ta
          </span>
        )}
      </div>

      {activeGroups.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Hech qaysi guruhga biriktirilmagan
        </p>
      ) : (
        <div className="space-y-2.5">
          {activeGroups.map((m) => {
            const g = m.group;
            return (
              <div
                key={m.membershipId || g._id}
                className="rounded-xl border border-border/60 p-3.5 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center justify-between gap-3">
                  {ownerLinks ? (
                    <Link
                      to={`/owner/groups/${g._id}`}
                      className="truncate font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {g.name}
                    </Link>
                  ) : (
                    <p className="truncate font-semibold text-foreground">
                      {g.name}
                    </p>
                  )}
                  {!readonly && (
                    <div className="flex shrink-0 items-center gap-1">
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
                            groupId: g._id,
                            studentId,
                            groupName: g.name,
                            isLast: activeGroups.length === 1,
                          })
                        }
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-2.5">
                  <GroupScheduleLines schedule={g.schedule} />
                </div>

                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  Qo'shilgan: {formatDateUz(m.joinedAt)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default UserActiveGroupsList;
