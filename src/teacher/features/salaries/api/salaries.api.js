import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const teacherSalariesAPI = {
  myCurrent: () => http.get(ENDPOINTS.salaries.myCurrent),
  myHistory: (params) => http.get(ENDPOINTS.salaries.myHistory, { params }),
  byId: (id) => http.get(ENDPOINTS.salaries.byId(id)),
  payouts: (id) => http.get(ENDPOINTS.salaries.payouts(id)),
};
