import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/shared/hooks/useAuth";
import { ROLE_HOME } from "@/shared/constants/roles";
import useBotAuthMutation from "../hooks/useBotAuthMutation";

const Container = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-slate-50 to-blue-50">
    <div className="max-w-md w-full bg-white border rounded-2xl shadow-sm p-6 space-y-4 text-center">
      {children}
    </div>
  </div>
);

const Spinner = () => (
  <div className="inline-block size-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
);

const BotAuthPage = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const triedRef = useRef(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { mutate, isPending, isError } = useBotAuthMutation({
    onSuccess: (data) => {
      const target = ROLE_HOME[data.user?.role] || "/";
      navigate(target, { replace: true });
    },
    onError: (err) => {
      setErrorMsg(
        err?.response?.data?.message ||
          "Telegram orqali kirishda xatolik yuz berdi.",
      );
    },
  });

  useEffect(() => {
    // Allaqachon login bo'lgan bo'lsa darhol panelga o'tkaz
    if (user) {
      navigate(ROLE_HOME[role] || "/", { replace: true });
      return;
    }
    if (triedRef.current) return;

    const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : null;
    if (!tg) {
      setErrorMsg(
        "Bu sahifa faqat Telegram Mini ilovasi orqali ochilishi kerak.",
      );
      return;
    }

    try {
      tg.ready();
      tg.expand();
    } catch {
      /* noop */
    }

    const initData = tg.initData;
    if (!initData) {
      setErrorMsg(
        "Telegram ma'lumotlari topilmadi. Mini ilovani Telegram'dan qayta oching.",
      );
      return;
    }

    triedRef.current = true;
    mutate(initData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, role]);

  if (user) {
    return (
      <Container>
        <p className="text-muted-foreground">Yo'naltirilmoqda...</p>
      </Container>
    );
  }

  if (isPending) {
    return (
      <Container>
        <Spinner />
        <h1 className="text-lg font-semibold">Telegram orqali kirilyapti</h1>
        <p className="text-sm text-muted-foreground">Iltimos, kuting...</p>
      </Container>
    );
  }

  if (isError || errorMsg) {
    return (
      <Container>
        <div className="text-3xl">⚠️</div>
        <h1 className="text-lg font-semibold">Kirib bo'lmadi</h1>
        <p className="text-sm text-muted-foreground">{errorMsg}</p>
        <p className="text-xs text-muted-foreground">
          Botda /start bosing va telefon raqamingizni yuboring, so'ng qayta urinib ko'ring.
        </p>
        <a
          href="/login"
          className="inline-block mt-2 text-sm text-blue-600 hover:underline"
        >
          Telefon va parol bilan kirish →
        </a>
      </Container>
    );
  }

  return (
    <Container>
      <Spinner />
      <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
    </Container>
  );
};

export default BotAuthPage;
