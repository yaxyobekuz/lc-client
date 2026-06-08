import Button from "@/shared/components/ui/button/Button";
import { formatPhone } from "@/shared/utils/formatPhone";
import { useRecordTrialOutcomeMutation } from "@/owner/features/leads";

const OUTCOME_BADGE = {
  attended: "bg-green-100 text-green-700",
  no_show: "bg-rose-100 text-rose-700",
};
const OUTCOME_LABEL = { attended: "Keldi", no_show: "Kelmadi" };

// Guruh davomat sahifasida shu kunga belgilangan sinov (trial) lidlari.
// O'qituvchi/owner ularning kelgan/kelmaganini shu yerda belgilaydi.
const TrialsSection = ({ trials = [] }) => {
  const { mutate, isPending } = useRecordTrialOutcomeMutation();
  if (!trials || trials.length === 0) return null;

  return (
    <div className="rounded-md border border-indigo-200 bg-indigo-50/40 p-3">
      <h3 className="mb-2 text-sm font-semibold text-indigo-900">
        Bugungi sinov o'quvchilari ({trials.length})
      </h3>
      <div className="divide-y divide-indigo-100">
        {trials.map((t) => (
          <div
            key={t._id}
            className="flex flex-wrap items-center justify-between gap-2 py-2"
          >
            <div className="min-w-0">
              <div className="font-medium truncate">
                {t.firstName} {t.lastName}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatPhone(t.phone) || "-"}
              </div>
            </div>
            {t.trialOutcome ? (
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${OUTCOME_BADGE[t.trialOutcome]}`}
              >
                {OUTCOME_LABEL[t.trialOutcome]}
              </span>
            ) : (
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                  disabled={isPending}
                  onClick={() => mutate({ id: t._id, outcome: "attended" })}
                  playClickSound={false}
                >
                  Keldi
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50"
                  disabled={isPending}
                  onClick={() => mutate({ id: t._id, outcome: "no_show" })}
                  playClickSound={false}
                >
                  Kelmadi
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrialsSection;
