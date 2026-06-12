import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import useAuth from "@/shared/hooks/useAuth";
import useObjectState from "@/shared/hooks/useObjectState";
import useBotAuthMutation from "../hooks/useBotAuthMutation";
import { extractApiErrorMessage } from "@/shared/utils/apiError";
import useBotAuthLoginMutation from "../hooks/useBotAuthLoginMutation";

// Components
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";

// Constants
import { ROLE_HOME } from "@/shared/constants/roles";

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
  const initDataRef = useRef("");

  // needLogin: hisob bog'lanmagan -> login formasi; qolganlari UI holati
  const ui = useObjectState({
    needLogin: false,
    errorMsg: "",
    login: "",
    password: "",
  });

  const goHome = (r) => navigate(ROLE_HOME[r] || "/", { replace: true });

  const { mutate: verify, isPending: isVerifying } = useBotAuthMutation({
    onSuccess: (data) => goHome(data.user?.role),
    onError: () => {
      // Verify qaysi sabab bilan o'tmasin (hisob bog'lanmagan=404, yoki initData
      // HMAC tekshiruvi o'tmadi=401), login formasini ko'rsatamiz - foydalanuvchi
      // parol bilan kiradi va Telegram avtomatik bog'lanadi (loginAndLink fallback).
      ui.setField("needLogin", true);
    },
  });

  const { mutate: loginAndLink, isPending: isLoggingIn } =
    useBotAuthLoginMutation({
      onSuccess: (data) => goHome(data.user?.role),
      onError: (err) => {
        ui.setField(
          "errorMsg",
          extractApiErrorMessage(err, "Login yoki parol noto'g'ri."),
        );
      },
    });

  useEffect(() => {
    if (triedRef.current) return;
    triedRef.current = true;

    const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : null;
    const initData = tg?.initData || "";
    // initDataUnsafe.user faqat HMAC tekshiruvisiz ko'rsatish uchun (diagnostika).
    const unsafeUser = tg?.initDataUnsafe?.user || null;

    // Telegram Mini App ichida EMAS (oddiy brauzer): login bo'lsa panelga, aks holda xabar.
    if (!tg || !initData) {
      if (user) {
        goHome(role);
        return;
      }
      // Diagnostika: initData nega bo'sh ekanini aniqlash uchun. tg bor-yo'qligi,
      // initDataUnsafe'da user bor-yo'qligi - ko'p hollarda WebApp tugmasi `web_app`
      // emas `url` turida yoki URL HTTPS emas bo'lsa, tg bor lekin initData bo'sh keladi.
      console.warn("[bot-auth] initData bo'sh", {
        hasTelegram: !!window.Telegram,
        hasWebApp: !!tg,
        version: tg?.version,
        platform: tg?.platform,
        hasInitDataUnsafeUser: !!unsafeUser,
        initDataLen: (tg?.initData || "").length,
      });
      ui.setField(
        "errorMsg",
        !tg
          ? "Bu sahifa faqat Telegram Mini ilovasi orqali ochilishi kerak."
          : "Telegram ma'lumotlari topilmadi. Mini ilovani Telegram'dan qayta oching (tugmani qayta bosing).",
      );
      return;
    }

    // Telegram ichida: localStorage'dagi eski/qoldiq tokenga ISHONMAYMIZ. Har safar
    // eng so'nggi initData bilan verify qilamiz - bu eng ishonchli manba (Telegram
    // sessiyasi har ochilishda yangilanadi). Shu sabab user bor-yo'qligidan qat'i
    // nazar oqimni doim verify'dan boshlaymiz; TG bog'lanmagan bo'lsa (404) login
    // formasi chiqadi, bog'langan bo'lsa to'g'ridan-to'g'ri panelga o'tadi.
    try {
      tg.ready();
      tg.expand();
    } catch {
      /* noop */
    }

    initDataRef.current = initData;
    verify(initData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!ui.login || !ui.password) return;
    ui.setField("errorMsg", "");
    loginAndLink({
      login: ui.login.trim(),
      password: ui.password,
      initData: initDataRef.current,
    });
  };

  // user bor (eski/qoldiq tokendan) - lekin Telegram ichida verify hali ketayotgan
  // bo'lsa, eski user'ga ishonib uyga yo'naltirmaymiz: verify tugashini kutamiz.
  // Verify muvaffaqiyatli bo'lsa onSuccess o'zi goHome qiladi.
  if (user && !isVerifying) {
    return (
      <Container>
        <p className="text-muted-foreground">Yo'naltirilmoqda...</p>
      </Container>
    );
  }

  // Hisob bog'lanmagan: login+parol so'raymiz, kirgach TG avtomatik bog'lanadi
  if (ui.needLogin) {
    return (
      <Container>
        <div className="text-3xl">🔐</div>
        <h1 className="text-lg font-semibold">Tizimga kirish</h1>
        <p className="text-sm text-muted-foreground">
          Hisobingizni Telegram'ga bog'lash uchun login va parolingizni kiriting.
          Keyingi safar avtomatik kirasiz.
        </p>
        <form onSubmit={handleLogin} className="space-y-3 text-left">
          <InputField
            required
            name="username"
            label="Login yoki telefon"
            value={ui.login}
            disabled={isLoggingIn}
            placeholder="Foydalanuvchi nomi yoki telefon"
            onChange={(e) => ui.setField("login", e.target.value)}
          />
          <InputField
            required
            type="password"
            name="password"
            label="Parol"
            value={ui.password}
            disabled={isLoggingIn}
            onChange={(e) => ui.setField("password", e.target.value)}
          />
          {ui.errorMsg && <p className="text-sm text-red-600">{ui.errorMsg}</p>}
          <Button type="submit" disabled={isLoggingIn} className="w-full">
            {isLoggingIn ? "Kirilyapti..." : "Kirish va bog'lash"}
          </Button>
        </form>
      </Container>
    );
  }

  if (ui.errorMsg) {
    return (
      <Container>
        <div className="text-3xl">⚠️</div>
        <h1 className="text-lg font-semibold">Kirib bo'lmadi</h1>
        <p className="text-sm text-muted-foreground">{ui.errorMsg}</p>
        <a
          href="/login"
          className="inline-block mt-2 text-sm text-blue-600 hover:underline"
        >
          Telefon va parol bilan kirish →
        </a>
      </Container>
    );
  }

  // Boshlang'ich / initData tekshiruvi
  return (
    <Container>
      <Spinner />
      <h1 className="text-lg font-semibold">Telegram orqali kirilyapti</h1>
      <p className="text-sm text-muted-foreground">Iltimos, kuting...</p>
    </Container>
  );
};

export default BotAuthPage;
