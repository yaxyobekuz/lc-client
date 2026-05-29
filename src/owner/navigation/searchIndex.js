import {
  Users,
  GraduationCap,
  Wallet,
  CalendarCheck,
  HandCoins,
  TrendingUp,
  Bell,
  ShieldCheck,
  MessageSquare,
  Receipt,
  LayoutDashboard,
  Settings,
  BarChart3,
  ListChecks,
  Inbox,
  PartyPopper,
  Tags,
  CircleDollarSign,
  UserCircle2,
} from "lucide-react";

// Bayyina admin panelining barcha qidiriladigan sahifalari.
// title — sahifa nomi (Uzbek)
// description — qisqa tavsif (Uzbek)
// keywords — qidiruv uchun qo'shimcha kalit so'zlar (UZ + EN)
// url — route
// icon — lucide-react komponenti
// category — sidebar guruh nomi (groupedga ishlatamiz)
// permission — RBAC kaliti (yo'q bo'lsa hamma uchun ochiq)
export const SEARCH_INDEX = [
  // Boshqaruv paneli
  {
    title: "Bosh sahifa",
    description: "Markaz statistikasi, daromad va xarajat ko'rinishlari",
    keywords: "dashboard, asosiy, overview, statistika, daromad, statistika, panel, home",
    url: "/owner/dashboard",
    icon: LayoutDashboard,
    category: "Boshqaruv paneli",
    permission: "admin_dashboard.read",
  },

  // Guruhlar
  {
    title: "Guruhlar",
    description: "Barcha guruhlar ro'yxati, yangi guruh ochish, tahrirlash",
    keywords: "guruh, groups, sinflar, classes, kurs, course, dars jadvali",
    url: "/owner/groups",
    icon: GraduationCap,
    category: "Guruhlar",
    permission: "groups.read",
  },

  // Foydalanuvchilar
  {
    title: "Foydalanuvchilar",
    description: "O'qituvchilar va o'quvchilar ro'yxati, parol, profil",
    keywords:
      "users, foydalanuvchi, o'qituvchi, teacher, talaba, student, o'quvchi, hisob, account",
    url: "/owner/users",
    icon: Users,
    category: "Foydalanuvchilar",
    permission: "users.read",
  },

  // Davomat
  {
    title: "Davomat belgilash",
    description: "Tanlangan guruhga kunlik davomatni qayd etish",
    keywords:
      "davomat, attendance, mark, belgilash, kelmadi, keldi, kechikdi, sababli, ozod",
    url: "/owner/attendance/mark",
    icon: ListChecks,
    category: "Davomat",
    permission: "attendance.record",
  },
  {
    title: "Davomat hisobotlari",
    description: "Davomat statistikasi, past davomatlilar, guruh bo'yicha hisobot",
    keywords:
      "davomat, attendance, report, hisobot, statistika, foiz, percent, dashboard",
    url: "/owner/attendance",
    icon: CalendarCheck,
    category: "Davomat",
    permission: "attendance.read",
  },
  {
    title: "Davomat × To'lov",
    description: "Talabaning davomat foizi va to'lov qarzdorligi bog'liqligi",
    keywords:
      "davomat, to'lov, correlation, attendance, payment, qarz, bog'liqlik",
    url: "/owner/attendance/correlation",
    icon: BarChart3,
    category: "Davomat",
    permission: "attendance.read",
  },
  {
    title: "Davomat sozlamalari",
    description: "Past davomat chegarasi, ketma-ket kelmaslik ogohlantirishi",
    keywords:
      "davomat, sozlama, settings, threshold, chegara, konfiguratsiya",
    url: "/owner/settings/attendance",
    icon: Settings,
    category: "Davomat",
    permission: "attendance.manage",
  },

  // To'lovlar
  {
    title: "To'lovlar",
    description: "Invoyslar, qabul qilingan to'lovlar, qaytarish (refund)",
    keywords:
      "to'lov, payment, invoice, hisob, qarz, kassa, naqd, karta, refund",
    url: "/owner/payments",
    icon: Wallet,
    category: "To'lovlar",
    permission: "payments.read",
  },
  {
    title: "To'lov usullari",
    description: "Naqd, karta, Click, Payme va bank o'tkazma usullarini boshqarish",
    keywords:
      "to'lov usuli, payment method, naqd, cash, karta, card, click, payme, bank",
    url: "/owner/payment-methods",
    icon: CircleDollarSign,
    category: "To'lovlar",
    permission: "payment_methods.manage",
  },
  {
    title: "Chegirma turlari",
    description: "Chegirma kategoriyalarini (oilaviy, ijtimoiy, aksiya) boshqarish",
    keywords: "chegirma, discount, kind, turlari, kategoriya, foiz, percent",
    url: "/owner/discount-kinds",
    icon: Tags,
    category: "To'lovlar",
    permission: "discount_kinds.manage",
  },
  {
    title: "To'lov sozlamalari",
    description: "To'lov tizimining default qiymatlari va siyosatlari",
    keywords: "to'lov, sozlama, payment, settings, konfiguratsiya",
    url: "/owner/settings/payments",
    icon: Settings,
    category: "To'lovlar",
    permission: "payment_settings.manage",
  },

  // Xarajatlar
  {
    title: "Xarajatlar",
    description: "Ijara, kommunal, reklama va boshqa xarajatlarni qayd etish",
    keywords:
      "xarajat, expense, chiqim, ijara, rent, kommunal, reklama, ads, budjet",
    url: "/owner/expenses",
    icon: Receipt,
    category: "Xarajatlar",
    permission: "expenses.read",
  },

  // Maoshlar
  {
    title: "Maoshlar",
    description: "O'qituvchilar oyligi, hisoblash, to'lov tarixi",
    keywords:
      "maosh, salary, oylik, oqituvchi, teacher, hisoblash, bonus, penalty",
    url: "/owner/salaries",
    icon: HandCoins,
    category: "Maoshlar",
    permission: "salaries.read",
  },
  {
    title: "Maosh hisobotlari",
    description: "Maosh statistikasi, oy bo'yicha trend va o'qituvchi taqsimoti",
    keywords:
      "maosh, salary, hisobot, report, trend, statistika, dashboard",
    url: "/owner/salaries/dashboard",
    icon: BarChart3,
    category: "Maoshlar",
    permission: "salaries.read",
  },
  {
    title: "Maosh sozlamalari",
    description: "Default hisoblash siyosati, bonus/penalti chegaralari",
    keywords: "maosh, sozlama, salary, settings, konfiguratsiya",
    url: "/owner/settings/salaries",
    icon: Settings,
    category: "Maoshlar",
    permission: "salaries.manage",
  },

  // Lidlar
  {
    title: "Lidlar",
    description: "CRM — potensial mijozlar ro'yxati va statuslari",
    keywords:
      "lid, lead, crm, mijoz, customer, ariza, request, telefon, sinov, trial",
    url: "/owner/leads",
    icon: TrendingUp,
    category: "Lidlar",
    permission: "leads.read",
  },
  {
    title: "Lidlar hisobotlari",
    description: "Lid statistikasi, konversiya va manba samaradorligi",
    keywords:
      "lid, lead, hisobot, report, konversiya, conversion, statistika",
    url: "/owner/leads/dashboard",
    icon: BarChart3,
    category: "Lidlar",
    permission: "leads.read",
  },
  {
    title: "Yo'nalishlar",
    description: "Lid yo'nalishlari (matematika, ingliz tili, ...)",
    keywords:
      "yo'nalish, direction, lid, lead, fan, kurs, matematika, english",
    url: "/owner/lead-directions",
    icon: Tags,
    category: "Lidlar",
    permission: "lead_directions.manage",
  },
  {
    title: "Lid statuslari",
    description: "Lidning pipeline holatlari (yangi, bog'lanildi, sinov, ...)",
    keywords:
      "status, lead, lid, pipeline, yangi, holati, bog'lanildi, sinov",
    url: "/owner/lead-statuses",
    icon: Tags,
    category: "Lidlar",
    permission: "lead_statuses.manage",
  },
  {
    title: "Lid manbalari",
    description: "Lid qaerdan kelganini boshqarish (Instagram, do'st, ...)",
    keywords:
      "manba, source, lid, lead, instagram, telegram, reklama, taraqqiyot",
    url: "/owner/lead-sources",
    icon: Tags,
    category: "Lidlar",
    permission: "lead_sources.manage",
  },
  {
    title: "Lidlar sozlamalari",
    description: "Lid avtomatik tayinlash va eslatma sozlamalari",
    keywords: "lid, sozlama, lead, settings, konfiguratsiya, reminder",
    url: "/owner/settings/leads",
    icon: Settings,
    category: "Lidlar",
    permission: "leads.update",
  },

  // Bildirishnomalar
  {
    title: "Inbox",
    description: "Sizga kelgan shaxsiy va guruh xabarlari",
    keywords: "inbox, xabar, bildirishnoma, notification, kelgan, unread",
    url: "/owner/inbox",
    icon: Inbox,
    category: "Bildirishnomalar",
  },
  {
    title: "Xabarlar",
    description: "Yuborilgan bildirishnomalar tarixi va statusi",
    keywords:
      "xabar, message, notification, bildirishnoma, sms, telegram, broadcast",
    url: "/owner/notifications",
    icon: Bell,
    category: "Bildirishnomalar",
    permission: "notifications.read",
  },
  {
    title: "Bildirishnoma hisobotlari",
    description: "Yuborilgan/yetkazilgan/o'qilgan xabarlar statistikasi",
    keywords:
      "bildirishnoma, hisobot, notification, report, statistika, dashboard",
    url: "/owner/notifications/dashboard",
    icon: BarChart3,
    category: "Bildirishnomalar",
    permission: "notifications.read",
  },
  {
    title: "Bildirishnoma shablonlari",
    description: "Tayyor xabar matnlari (qarz, bayram, e'lon)",
    keywords:
      "shablon, template, bildirishnoma, notification, qarz, bayram, e'lon, announcement",
    url: "/owner/notification-templates",
    icon: ListChecks,
    category: "Bildirishnomalar",
    permission: "notification_templates.manage",
  },
  {
    title: "Bayramlar",
    description: "Bayram va dam olish kunlari (avtomatik tabriklar)",
    keywords:
      "bayram, holiday, ta'til, dam olish, tabrik, navruz, mustaqillik",
    url: "/owner/holidays",
    icon: PartyPopper,
    category: "Bildirishnomalar",
    permission: "holidays.manage",
  },

  // Feedback
  {
    title: "Feedback",
    description: "Foydalanuvchilardan kelgan fikr-mulohazalar",
    keywords:
      "feedback, fikr, mulohaza, shikoyat, taklif, complaint, review, opinion",
    url: "/owner/feedback",
    icon: MessageSquare,
    category: "Feedback",
    permission: "feedback.read",
  },
  {
    title: "Feedback hisobotlari",
    description: "Murojaat turlari, javob beruvchi, status statistikasi",
    keywords: "feedback, hisobot, report, statistika, dashboard",
    url: "/owner/feedback/dashboard",
    icon: BarChart3,
    category: "Feedback",
    permission: "feedback.read",
  },
  {
    title: "Feedback turlari",
    description: "Murojaat kategoriyalarini boshqarish",
    keywords: "feedback, turlari, kategoriya, type, taklif, shikoyat",
    url: "/owner/feedback-types",
    icon: Tags,
    category: "Feedback",
    permission: "feedback_types.manage",
  },

  // Audit
  {
    title: "Faoliyat loglari",
    description: "Tizimdagi yozish/o'zgartirish/o'chirish amallari tarixi",
    keywords:
      "audit, faoliyat, log, activity, tarix, history, security, kim, qachon",
    url: "/owner/activity-logs",
    icon: ShieldCheck,
    category: "Audit",
    permission: "activity_logs.read",
  },

  // Hisob
  {
    title: "Profil",
    description: "Shaxsiy ma'lumotlar va parolni o'zgartirish",
    keywords: "profil, profile, hisob, account, parol, password, sozlamalar",
    url: "/owner/profile",
    icon: UserCircle2,
    category: "Hisob",
  },
];

// Bitta yozuvni qidiruv matniga to'g'rilash uchun katlangan stringi
export const buildSearchHaystack = (item) =>
  `${item.title} ${item.description} ${item.keywords} ${item.category}`.toLowerCase();
