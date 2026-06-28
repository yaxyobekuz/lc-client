// Router
import { useNavigate } from "react-router-dom";

// Components
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";

// Hooks
import useObjectState from "@/shared/hooks/useObjectState";
import useUserPermanentRemoveMutation from "../hooks/useUserPermanentRemoveMutation";

// Constants
import { ROLES } from "@/shared/constants/roles";

const UserPermanentDeleteModal = ({ user, close, isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const isStudent = user?.role === ROLES.STUDENT;
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const obj = useObjectState({ step: 1, confirmName: "" });

  const { mutate } = useUserPermanentRemoveMutation({
    onSuccess: () => {
      setIsLoading(false);
      close?.();
      navigate("/owner/users", { replace: true });
    },
    onError: () => setIsLoading(false),
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutate({ id: user._id, confirmName: obj.confirmName.trim() || undefined });
  };

  const nameMatches = obj.confirmName.trim() === fullName;

  // O'qituvchi/boshqa rollar: bitta bosqichli (bog'liqlik bo'lsa server bloklaydi).
  if (!isStudent) {
    return (
      <div className="space-y-4">
        <p className="text-sm">
          <span className="font-semibold">{fullName}</span> butunlay o'chiriladi va
          tiklab bo'lmaydi. O'chirish faqat foydalanuvchi hech qanday ma'lumotga
          (oylik, guruh, davomat va h.k.) bog'liq bo'lmaganda mumkin - aks holda
          xatolik chiqadi.
        </p>
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
            {isLoading ? "O'chirilmoqda..." : "Ha, butunlay o'chirish"}
          </Button>
        </div>
      </div>
    );
  }

  // 1-bosqich: kuchli ogohlantirish.
  if (obj.step === 1) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <p className="font-semibold">
            ⚠ {fullName} butunlay o'chiriladi. Bu amalni qaytarib bo'lmaydi.
          </p>
          <p className="mt-2">Quyidagilarning barchasi yo'q qilinadi:</p>
          <ul className="mt-1 list-inside list-disc space-y-0.5">
            <li>To'lovlar va to'lov tranzaksiyalari</li>
            <li>Depozit (garov) va depozit tranzaksiyalari</li>
            <li>Guruh a'zoliklari (o'qish davrlari)</li>
            <li>Davomat va baholar</li>
            <li>Chegirmalar va fikr-mulohazalar</li>
          </ul>
          <p className="mt-2">
            O'qituvchi maoshlari avtomatik qayta hisoblanadi.
          </p>
        </div>

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
            onClick={() => obj.setField("step", 2)}
            disabled={isLoading}
            className="flex-1"
          >
            Davom etish
          </Button>
        </div>
      </div>
    );
  }

  // 2-bosqich: ism yozib tasdiqlash.
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Tasdiqlash uchun o'quvchining to'liq ismini yozing:{" "}
        <span className="font-semibold text-foreground">{fullName}</span>
      </p>

      <InputField
        name="confirmName"
        label="To'liq ism"
        value={obj.confirmName}
        placeholder={fullName}
        autoComplete="off"
        onChange={(e) => obj.setField("confirmName", e.target.value)}
        disabled={isLoading}
      />

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => obj.setField("step", 1)}
          disabled={isLoading}
          className="flex-1"
        >
          Orqaga
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleConfirm}
          disabled={isLoading || !nameMatches}
          className="flex-1"
        >
          {isLoading ? "O'chirilmoqda..." : "Butunlay o'chirish"}
        </Button>
      </div>
    </div>
  );
};

export default UserPermanentDeleteModal;
