import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const salarySettingsAPI = {
  get: () => http.get(ENDPOINTS.salarySettings.base),
  update: (body) => http.patch(ENDPOINTS.salarySettings.base, body),
};
