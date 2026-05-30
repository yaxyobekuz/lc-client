// Modal keys - also used as the Redux store name; never hardcode the string elsewhere
export const MODAL = Object.freeze({
  // Students
  STUDENT_CREATE: "student:create",
  STUDENT_EDIT: "student:edit",
  STUDENT_DELETE: "student:delete",

  // Teachers
  TEACHER_CREATE: "teacher:create",
  TEACHER_EDIT: "teacher:edit",
  TEACHER_DELETE: "teacher:delete",

  // Classes
  CLASS_CREATE: "class:create",
  CLASS_EDIT: "class:edit",
  CLASS_DELETE: "class:delete",

  // Users (owner panel)
  USER_CREATE: "user:create",
  USER_EDIT: "user:edit",
  USER_DELETE: "user:delete",
  USER_PASSWORD: "user:password",

  // Groups
  GROUP_CREATE: "group:create",
  GROUP_EDIT: "group:edit",
  GROUP_DELETE: "group:delete",
  GROUP_ADD_STUDENT: "group:addStudent",
  GROUP_TRANSFER_STUDENT: "group:transferStudent",
  GROUP_REMOVE_STUDENT: "group:removeStudent",
  GROUP_REPLACE_TEACHER: "group:replaceTeacher",

  // Lead sources
  LEAD_SOURCE_CREATE: "leadSource:create",
  LEAD_SOURCE_EDIT: "leadSource:edit",
  LEAD_SOURCE_DELETE: "leadSource:delete",

  // Payment methods
  PAYMENT_METHOD_CREATE: "paymentMethod:create",
  PAYMENT_METHOD_EDIT: "paymentMethod:edit",
  PAYMENT_METHOD_DELETE: "paymentMethod:delete",

  // Discount kinds
  DISCOUNT_KIND_CREATE: "discountKind:create",
  DISCOUNT_KIND_EDIT: "discountKind:edit",
  DISCOUNT_KIND_DELETE: "discountKind:delete",

  // Discounts (per-student)
  DISCOUNT_CREATE: "discount:create",
  DISCOUNT_EDIT: "discount:edit",
  DISCOUNT_DELETE: "discount:delete",

  // Invoices
  INVOICE_CREATE: "invoice:create",
  INVOICE_EDIT: "invoice:edit",
  INVOICE_CANCEL: "invoice:cancel",
  INVOICE_GENERATE_MONTH: "invoice:generateMonth",

  // Payments
  PAYMENT_RECORD: "payment:record",
  PAYMENT_REFUND: "payment:refund",

  // Attendance
  ATTENDANCE_BULK_SAVE_CONFIRM: "attendance:bulkSaveConfirm",
  ATTENDANCE_EXEMPTION_CREATE: "attendanceExemption:create",
  ATTENDANCE_EXEMPTION_EDIT: "attendanceExemption:edit",
  ATTENDANCE_EXEMPTION_DELETE: "attendanceExemption:delete",

  // Salaries
  SALARY_CALCULATE_BULK: "salary:calculateBulk",
  SALARY_RECOMPUTE_CONFIRM: "salary:recomputeConfirm",
  SALARY_APPROVE_CONFIRM: "salary:approveConfirm",
  SALARY_CANCEL_CONFIRM: "salary:cancelConfirm",
  SALARY_ADJUSTMENT_ADD: "salary:adjustmentAdd",
  SALARY_ADJUSTMENT_REMOVE_CONFIRM: "salary:adjustmentRemoveConfirm",
  SALARY_PAYOUT_ADD: "salary:payoutAdd",
  SALARY_PAYOUT_REMOVE_CONFIRM: "salary:payoutRemoveConfirm",
  TEACHER_GROUP_RATE_CREATE: "teacherGroupRate:create",
  TEACHER_GROUP_RATE_EDIT: "teacherGroupRate:edit",
  TEACHER_GROUP_RATE_DELETE: "teacherGroupRate:delete",

  // Leads (CRM)
  LEAD_CREATE: "lead:create",
  LEAD_EDIT: "lead:edit",
  LEAD_DELETE_CONFIRM: "lead:deleteConfirm",
  LEAD_STATUS_CHANGE: "lead:statusChange",
  LEAD_ADD_NOTE: "lead:addNote",
  LEAD_RECORD_CONTACT: "lead:recordContact",
  LEAD_SET_FOLLOWUP: "lead:setFollowUp",
  LEAD_SET_TRIAL: "lead:setTrial",
  LEAD_CONVERT: "lead:convert",
  LEAD_DIRECTION_CREATE: "leadDirection:create",
  LEAD_DIRECTION_EDIT: "leadDirection:edit",
  LEAD_DIRECTION_DELETE: "leadDirection:delete",
  LEAD_STATUS_FORM_CREATE: "leadStatusForm:create",
  LEAD_STATUS_FORM_EDIT: "leadStatusForm:edit",
  LEAD_STATUS_FORM_DELETE: "leadStatusForm:delete",

  // Notifications + Feedback (Bo'lak 7)
  NOTIFICATION_SEND: "notification:send",
  NOTIFICATION_TEMPLATE_CREATE: "notificationTemplate:create",
  NOTIFICATION_TEMPLATE_EDIT: "notificationTemplate:edit",
  NOTIFICATION_TEMPLATE_DELETE: "notificationTemplate:delete",
  HOLIDAY_CREATE: "holiday:create",
  HOLIDAY_EDIT: "holiday:edit",
  HOLIDAY_DELETE: "holiday:delete",
  FEEDBACK_SUBMIT: "feedback:submit",
  FEEDBACK_REPLY: "feedback:reply",
  FEEDBACK_RESOLVE: "feedback:resolve",
  FEEDBACK_REJECT: "feedback:reject",
  FEEDBACK_TYPE_CREATE: "feedbackType:create",
  FEEDBACK_TYPE_EDIT: "feedbackType:edit",
  FEEDBACK_TYPE_DELETE: "feedbackType:delete",

  // Profil
  PROFILE_EDIT: "profile:edit",
  PROFILE_CHANGE_PASSWORD: "profile:changePassword",

  // Boshqaruv paneli (Bo'lak 9)
  EXPENSE_CREATE: "expense:create",
  EXPENSE_EDIT: "expense:edit",
  EXPENSE_DELETE: "expense:delete",
  ACTIVITY_LOG_DETAIL: "activityLog:detail",
});
