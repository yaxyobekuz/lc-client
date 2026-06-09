// Permission keys - same strings live in the DB
export const PERMISSIONS = Object.freeze({
  // Users
  USERS_READ: "users.read",

  // Students
  STUDENTS_READ: "students.read",
  STUDENTS_CREATE: "students.create",
  STUDENTS_UPDATE: "students.update",
  STUDENTS_DELETE: "students.delete",

  // Teachers
  TEACHERS_READ: "teachers.read",
  TEACHERS_CREATE: "teachers.create",
  TEACHERS_UPDATE: "teachers.update",
  TEACHERS_DELETE: "teachers.delete",

  // Classes
  CLASSES_READ: "classes.read",
  CLASSES_CREATE: "classes.create",
  CLASSES_UPDATE: "classes.update",
  CLASSES_DELETE: "classes.delete",

  // Groups
  GROUPS_READ: "groups.read",
  GROUPS_CREATE: "groups.create",
  GROUPS_UPDATE: "groups.update",
  GROUPS_DELETE: "groups.delete",
  GROUPS_MANAGE_STUDENTS: "groups.manage_students",

  // Payments
  PAYMENTS_READ: "payments.read",
  PAYMENTS_CREATE: "payments.create",
  PAYMENTS_REFUND: "payments.refund",

  INVOICES_READ: "invoices.read",
  INVOICES_CREATE: "invoices.create",
  INVOICES_UPDATE: "invoices.update",
  INVOICES_CANCEL: "invoices.cancel",

  DISCOUNTS_MANAGE: "discounts.manage",
  PAYMENT_METHODS_MANAGE: "payment_methods.manage",
  DISCOUNT_KINDS_MANAGE: "discount_kinds.manage",
  PAYMENT_SETTINGS_MANAGE: "payment_settings.manage",

  // Attendance
  ATTENDANCE_READ: "attendance.read",
  ATTENDANCE_RECORD: "attendance.record",
  ATTENDANCE_MANAGE: "attendance.manage",

  // Grades (baholash) + Rating (reyting)
  GRADES_READ: "grades.read",
  GRADES_RECORD: "grades.record",
  GRADES_MANAGE: "grades.manage",
  RATING_READ: "rating.read",
  RATING_MANAGE: "rating.manage",

  // Salaries
  SALARIES_READ: "salaries.read",
  SALARIES_MANAGE: "salaries.manage",
  SALARIES_DISTRIBUTE: "salaries.distribute",

  // Notifications + Feedback
  NOTIFICATIONS_READ: "notifications.read",
  NOTIFICATIONS_SEND: "notifications.send",
  NOTIFICATION_TEMPLATES_MANAGE: "notification_templates.manage",
  HOLIDAYS_MANAGE: "holidays.manage",
  FEEDBACK_READ: "feedback.read",
  FEEDBACK_RESPOND: "feedback.respond",
  FEEDBACK_TYPES_MANAGE: "feedback_types.manage",

  // Admin / boshqaruv paneli (Bo'lak 9)
  ADMIN_DASHBOARD_READ: "admin_dashboard.read",
  EXPENSES_READ: "expenses.read",
  EXPENSES_MANAGE: "expenses.manage",
  ACTIVITY_LOGS_READ: "activity_logs.read",
});
