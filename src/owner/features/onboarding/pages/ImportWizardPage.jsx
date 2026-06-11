// React
import { useMemo, useState } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Icons
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";

// Sonner
import { toast } from "sonner";

// Components
import Button from "@/shared/components/ui/button/Button";
import StepBars from "@/shared/components/ui/steps/StepBars";
import Step1GroupSetup from "../components/Step1GroupSetup";
import Step2Students from "../components/Step2Students";
import Step3Payments from "../components/Step3Payments";
import Step4Review from "../components/Step4Review";

// Hooks
import useObjectState from "@/shared/hooks/useObjectState";
import { useImportMutation } from "../hooks/useImportMutation";
import { useImportDraft, loadDraft, clearDraft } from "../hooks/useImportDraft";

// Utils
import { elapsedMonths } from "../utils/months";
import { makeRows } from "../utils/students";
import { buildImportPayload } from "../utils/buildPayload";
import { validateRow } from "../utils/students";
import { canonicalPhone } from "../utils/students";

const STEPS = [
  { n: 1, title: "Guruh" },
  { n: 2, title: "O'quvchilar" },
  { n: 3, title: "Tarixiy to'lovlar" },
  { n: 4, title: "Tasdiqlash" },
];

const freshState = () => ({
  idempotencyKey: crypto.randomUUID(),
  group: {
    name: "",
    startDate: "",
    durationMonths: "",
    monthlyPrice: "",
    teacherId: "",
    schedule: [],
  },
  students: makeRows(5),
  // { [rowId]: { [monthKey]: { amount, method } } }
  payments: {},
});

const ImportWizardPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null); // import natijasi (server)

  // Qoramol (draft) bo'lsa - undan tiklaymiz; aks holda toza holat.
  const initial = useMemo(() => loadDraft() || freshState(), []);
  const state = useObjectState(initial);
  const { group, students, payments, idempotencyKey, setField } = state;

  // Faqat result yo'q paytda avtosaqlash (muvaffaqiyatdan keyin yozmaymiz).
  useImportDraft(
    { idempotencyKey, group, students, payments },
    { enabled: !result },
  );

  // "Bugun" ni mount paytida bir marta qotirami (render davomida impure
  // new Date() chaqirmaslik + yarim tunda oylar surilib ketmasligi uchun).
  const [now] = useState(() => new Date());
  const months = useMemo(
    () => elapsedMonths(group.startDate, now),
    [group.startDate, now],
  );

  const mutation = useImportMutation({
    onSuccess: (data) => {
      setResult(data);
      clearDraft();
    },
  });

  // ── Qadam validatsiyasi (Keyingiga o'tishdan oldin) ─────────────────────────
  const startKey = useMemo(() => {
    if (!group.startDate) return null;
    const d = new Date(group.startDate);
    return d.getFullYear() * 12 + d.getMonth();
  }, [group.startDate]);

  const validateStep1 = () => {
    if (!group.name.trim() || group.name.trim().length < 2) {
      toast.error("Guruh nomini kiriting (kamida 2 belgi)");
      return false;
    }
    if (!group.startDate) {
      toast.error("Guruh boshlanish sanasini tanlang");
      return false;
    }
    const start = new Date(group.startDate);
    if (start.getTime() > Date.now()) {
      toast.error("Boshlanish sanasi kelajakda bo'lishi mumkin emas");
      return false;
    }
    if (!group.durationMonths || Number(group.durationMonths) < 1) {
      toast.error("Kurs davomiyligini kiriting");
      return false;
    }
    if (group.monthlyPrice === "" || Number(group.monthlyPrice) < 0) {
      toast.error("Oylik narxni kiriting");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (students.length === 0) {
      toast.error("Kamida bitta o'quvchi kerak");
      return false;
    }
    // Dublikat hisoblash (telefon/username)
    const phoneCount = new Map();
    const unameCount = new Map();
    for (const r of students) {
      if (r.existingStudentId) continue;
      const p = canonicalPhone(r.phone);
      if (p) phoneCount.set(p, (phoneCount.get(p) || 0) + 1);
      const u = r.username?.trim().toLowerCase();
      if (u) unameCount.set(u, (unameCount.get(u) || 0) + 1);
    }
    let firstError = null;
    students.forEach((r, idx) => {
      const errs = validateRow(r, {
        startKey,
        seenPhones: phoneCount,
        seenUsernames: unameCount,
      });
      if (Object.keys(errs).length && !firstError) {
        firstError = `${idx + 1}-qatorda xato: ${Object.values(errs)[0]}`;
      }
    });
    if (firstError) {
      toast.error(firstError);
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => Math.min(4, s + 1));
  };
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handleConfirm = () => {
    const payload = buildImportPayload({ group, students, payments, idempotencyKey });
    mutation.mutate(payload);
  };

  const handleRestart = () => {
    clearDraft();
    const fresh = freshState();
    state.setFields(fresh);
    setResult(null);
    setStep(1);
  };

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      {/* Sarlavha + qadamlar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Mavjud ma'lumotni import qilish</h1>
            <p className="text-sm text-muted-foreground">
              Tizimga kirishdan oldin boshlangan guruhlar, o'quvchilar va tarixiy
              to'lovlarni tez kiriting.
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/groups")}>
            Chiqish
          </Button>
        </div>

        <StepBars totalSteps={4} currentStep={step} />
        <div className="flex items-center justify-between text-xs sm:text-sm">
          {STEPS.map((s) => (
            <span
              key={s.n}
              className={
                s.n === step
                  ? "font-semibold text-blue-600"
                  : s.n < step
                    ? "text-gray-700"
                    : "text-muted-foreground"
              }
            >
              {s.n}. {s.title}
            </span>
          ))}
        </div>
      </div>

      {/* Qadam mazmuni */}
      {step === 1 && (
        <Step1GroupSetup
          group={group}
          months={months}
          onChange={(patch) => setField("group", { ...group, ...patch })}
        />
      )}
      {step === 2 && (
        <Step2Students
          students={students}
          group={group}
          onChange={(next) => setField("students", next)}
        />
      )}
      {step === 3 && (
        <Step3Payments
          students={students}
          group={group}
          months={months}
          payments={payments}
          onChange={(next) => setField("payments", next)}
        />
      )}
      {step === 4 && (
        <Step4Review
          group={group}
          students={students}
          months={months}
          payments={payments}
          result={result}
          isLoading={mutation.isPending}
        />
      )}

      {/* Navigatsiya */}
      {!result && (
        <div className="flex items-center justify-between gap-3 sticky bottom-0 bg-white/80 backdrop-blur border-t py-3">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={step === 1 || mutation.isPending}
          >
            <ArrowLeft className="size-4" /> Orqaga
          </Button>

          {step < 4 ? (
            <Button onClick={goNext}>
              Keyingi <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button onClick={handleConfirm} disabled={mutation.isPending}>
              <Check className="size-4" />
              {mutation.isPending ? "Import qilinmoqda..." : "Tasdiqlash va import qilish"}
            </Button>
          )}
        </div>
      )}

      {/* Muvaffaqiyatdan keyin */}
      {result && (
        <div className="flex items-center justify-end gap-3 border-t py-3">
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="size-4" /> Yana import qilish
          </Button>
          <Button onClick={() => navigate(`/groups/${result.group._id}`)}>
            Guruhni ochish <ArrowRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImportWizardPage;
