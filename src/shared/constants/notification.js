// Notification domain constants

export const NOTIFICATION_CATEGORIES = [
  "payment_reminder",
  "debt_warning",
  "class_cancel",
  "announcement",
  "admin_personal",
  "teacher_message",
  "feedback_status",
  "holiday",
  "template_based",
  "other",
];

export const CATEGORY_LABEL = {
  payment_reminder: "To'lov eslatmasi",
  debt_warning: "Qarz ogohlantirishi",
  class_cancel: "Dars bekor qilindi",
  announcement: "E'lon",
  admin_personal: "Shaxsiy xabar",
  teacher_message: "O'qituvchi xabari",
  feedback_status: "Feedback holati",
  holiday: "Bayram tabrigi",
  template_based: "Shablonli xabar",
  other: "Boshqa",
};

export const CATEGORY_BADGE_CLASS = {
  payment_reminder: "bg-amber-100 text-amber-800",
  debt_warning: "bg-red-100 text-red-700",
  class_cancel: "bg-orange-100 text-orange-800",
  announcement: "bg-blue-100 text-blue-800",
  admin_personal: "bg-violet-100 text-violet-700",
  teacher_message: "bg-cyan-100 text-cyan-700",
  feedback_status: "bg-slate-100 text-slate-700",
  holiday: "bg-pink-100 text-pink-700",
  template_based: "bg-indigo-100 text-indigo-700",
  other: "bg-gray-100 text-gray-700",
};

export const CATEGORY_EMOJI = {
  payment_reminder: "💰",
  debt_warning: "⚠️",
  class_cancel: "❌",
  announcement: "📢",
  admin_personal: "✉️",
  teacher_message: "👨‍🏫",
  feedback_status: "📝",
  holiday: "🎉",
  template_based: "📨",
  other: "📨",
};

export const CATEGORY_OPTIONS = NOTIFICATION_CATEGORIES.map((c) => ({
  value: c,
  label: CATEGORY_LABEL[c],
}));

export const AUDIENCE_TYPES = [
  "all_students",
  "all_teachers",
  "groups",
  "users",
  "individual",
  "feedback_author",
  "auto_system",
];

export const AUDIENCE_TYPE_LABEL = {
  all_students: "Barcha o'quvchilar",
  all_teachers: "Barcha o'qituvchilar",
  groups: "Guruh(lar) bo'yicha",
  users: "Tanlangan foydalanuvchilar",
  individual: "Bitta foydalanuvchi",
  feedback_author: "Feedback muallifi",
  auto_system: "Avto-tizim",
};

// Template kategoriyalari (alohida - notification kategoriyalaridan farq qiladi)
export const TEMPLATE_CATEGORIES = [
  "payment",
  "debt",
  "class_cancel",
  "announcement",
  "holiday",
  "personal",
  "feedback_status",
  "custom",
];

export const TEMPLATE_CATEGORY_LABEL = {
  payment: "To'lov",
  debt: "Qarz",
  class_cancel: "Dars bekor qilindi",
  announcement: "E'lon",
  holiday: "Bayram",
  personal: "Shaxsiy",
  feedback_status: "Feedback",
  custom: "Boshqa",
};

export const TEMPLATE_CATEGORY_OPTIONS = TEMPLATE_CATEGORIES.map((c) => ({
  value: c,
  label: TEMPLATE_CATEGORY_LABEL[c],
}));

export const HOLIDAY_AUDIENCES = ["all", "students", "teachers"];

export const HOLIDAY_AUDIENCE_LABEL = {
  all: "Hammaga",
  students: "O'quvchilarga",
  teachers: "O'qituvchilarga",
};

export const HOLIDAY_AUDIENCE_OPTIONS = HOLIDAY_AUDIENCES.map((a) => ({
  value: a,
  label: HOLIDAY_AUDIENCE_LABEL[a],
}));

export const MONTH_OPTIONS = [
  { value: 1, label: "Yanvar" },
  { value: 2, label: "Fevral" },
  { value: 3, label: "Mart" },
  { value: 4, label: "Aprel" },
  { value: 5, label: "May" },
  { value: 6, label: "Iyun" },
  { value: 7, label: "Iyul" },
  { value: 8, label: "Avgust" },
  { value: 9, label: "Sentyabr" },
  { value: 10, label: "Oktyabr" },
  { value: 11, label: "Noyabr" },
  { value: 12, label: "Dekabr" },
];
