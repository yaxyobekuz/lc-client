// Modal keys — also used as the Redux store name; never hardcode the string elsewhere
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
});
