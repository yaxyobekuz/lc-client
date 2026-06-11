import { monthKey } from "./months";

// Sehrgar holatini (group + students + payments matritsasi) server kutadigan
// import body'siga aylantiradi. idempotencyKey - sehrgar boshida bir marta
// generatsiya qilinadi (double-click/retry himoyasi).
//
// state shakli:
//   group: { name, startDate, durationMonths, monthlyPrice, teacherId, schedule }
//   students: [{ firstName, lastName, phone, username, password, joinDate,
//               priceOverride, existingStudentId }]
//   payments: { [rowId]: { [monthKey]: { amount, method } } }
export const buildImportPayload = (state) => {
  const { group, students, payments, idempotencyKey } = state;

  return {
    idempotencyKey,
    group: {
      name: group.name.trim(),
      startDate: group.startDate,
      durationMonths: Number(group.durationMonths),
      monthlyPrice: Number(group.monthlyPrice),
      teacherId: group.teacherId || null,
      schedule: (group.schedule || []).map((s) => ({
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
      })),
    },
    students: students.map((row) => {
      const cells = payments?.[row._id] || {};
      const paid = Object.entries(cells)
        .filter(([, c]) => c && Number(c.amount) > 0)
        .map(([k, c]) => {
          const idx = Number(k);
          return {
            year: Math.floor(idx / 12),
            month: (idx % 12) + 1,
            amount: Number(c.amount),
            method: c.method || "cash",
          };
        });

      const linking = !!row.existingStudentId;
      return {
        firstName: row.firstName?.trim() || (linking ? "—" : ""),
        lastName: row.lastName?.trim() || (linking ? "—" : ""),
        phone: row.phone?.trim() || (linking ? "000000000" : ""),
        username: row.username?.trim() || (linking ? `linked_${row.existingStudentId}` : ""),
        password: row.password || (linking ? "linked0000" : ""),
        joinDate: row.joinDate,
        priceOverride:
          row.priceOverride === "" || row.priceOverride == null
            ? null
            : Number(row.priceOverride),
        existingStudentId: row.existingStudentId || null,
        payments: paid,
      };
    }),
  };
};

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

// Sehrgar yakuniy jami: yig'ilgan, kutilgan, qarz (Step 3 footer uchun TAXMINIY
// ko'rsatkich). Qo'shilgan oy proratsiyalanadi (kalendar kun bo'yicha) - server
// bilan yaqin chiqishi uchun. ANIQ raqamlar import javobida server'dan keladi
// (Step 4 muvaffaqiyat ekrani perStudent.expected/debt'ni ishlatadi).
export const computeTotals = (state, months) => {
  const { group, students, payments } = state;
  const price = Number(group.monthlyPrice) || 0;
  const validKeys = new Set(months.map((m) => m.key));

  let collected = 0;
  let expected = 0;

  for (const row of students) {
    const override = row.priceOverride === "" || row.priceOverride == null ? null : Number(row.priceOverride);
    const effectivePrice = override != null ? override : price;
    const join = row.joinDate ? new Date(row.joinDate) : null;
    const jYear = join ? join.getFullYear() : null;
    const jMonth = join ? join.getMonth() + 1 : null;
    const jk = join ? monthKey(jYear, jMonth) : -Infinity;
    const jDay = join ? join.getDate() : 1;

    for (const m of months) {
      if (m.key < jk) continue; // qo'shilishdan oldingi oylar hisobga olinmaydi
      // Qo'shilgan oy: o'sha kundan oy oxirigacha proratsiya (kalendar kun).
      if (m.key === jk && jDay > 1) {
        const total = daysInMonth(m.year, m.month);
        const payable = total - jDay + 1;
        expected += Math.round((effectivePrice * payable) / total);
      } else {
        expected += effectivePrice;
      }
    }
    const cells = payments?.[row._id] || {};
    for (const [k, c] of Object.entries(cells)) {
      if (!validKeys.has(Number(k))) continue;
      if (c && Number(c.amount) > 0) collected += Number(c.amount);
    }
  }

  return { collected, expected, debt: Math.max(0, expected - collected) };
};
