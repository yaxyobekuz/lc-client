import { useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import { LEAVE_STATUS } from "@/shared/constants/leaveStatus";
import useGroupRemoveStudentMutation from "@/owner/features/groups/hooks/useGroupRemoveStudentMutation";

const GroupRemoveStudentConfirmModal = ({
  groupId,
  studentId,
  groupName,
  isLast = false,
  debt = 0,
  close,
  isLoading,
  setIsLoading,
}) => {
  // Oxirgi guruh bo'lsa: qarzga qarab dastlabki holatni tanlaymiz
  const [leaveStatus, setLeaveStatus] = useState(
    debt > 0 ? LEAVE_STATUS.LEFT_UNPAID : LEAVE_STATUS.LEFT_PAID,
  );

  const { mutate } = useGroupRemoveStudentMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate({
      id: groupId,
      studentId,
      leaveStatus: isLast ? leaveStatus : undefined,
    });
  };

  const options = [
    {
      value: LEAVE_STATUS.LEFT_PAID,
      label: "To'lab chiqdi",
      desc: "Qarzi yo'q, to'liq hisob-kitob qilingan",
    },
    {
      value: LEAVE_STATUS.LEFT_UNPAID,
      label: "Qarzi bilan chiqdi",
      desc: "To'lanmagan qarzi bor",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Talaba <span className="font-semibold">{groupName}</span> guruhidan
        chiqariladi.
        {isLast ? " Bu uning oxirgi guruhi." : " Davom etasizmi?"}
      </p>

      {isLast && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground/80">
            Talaba qanday chiqyapti?
          </p>
          {options.map((o) => {
            const active = leaveStatus === o.value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => setLeaveStatus(o.value)}
                disabled={isLoading}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                <span
                  className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    active ? "border-primary" : "border-muted-foreground/40"
                  }`}
                >
                  {active && (
                    <span className="size-2 rounded-full bg-primary" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{o.label}</span>
                  <span className="block text-xs text-muted-foreground">
                    {o.desc}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => close?.()}
          disabled={isLoading}
          className="flex-1"
        >
          Bekor qilish
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleConfirm}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Chiqarilmoqda..." : "Chiqarish"}
        </Button>
      </div>
    </div>
  );
};

export default GroupRemoveStudentConfirmModal;
