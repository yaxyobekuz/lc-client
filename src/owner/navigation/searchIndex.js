import {
  Users,
  GraduationCap,
  CalendarCheck,
  Bell,
  ShieldCheck,
  MessageSquare,
  LayoutDashboard,
  Settings,
  BarChart3,
  ListChecks,
  Inbox,
  PartyPopper,
  Tags,
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
    description: "Markaz statistikasi va umumiy ko'rsatkichlar",
    keywords: "dashboard, asosiy, overview, statistika, panel, home",
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
    title: "Davomat sozlamalari",
    description: "Past davomat chegarasi, ketma-ket kelmaslik ogohlantirishi",
    keywords:
      "davomat, sozlama, settings, threshold, chegara, konfiguratsiya",
    url: "/owner/settings/attendance",
    icon: Settings,
    category: "Davomat",
    permission: "attendance.manage",
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
