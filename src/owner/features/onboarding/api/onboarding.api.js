// API
import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const onboardingAPI = {
  // Tarixiy ma'lumotni bitta atomik so'rovda import qiladi.
  import: (body) => http.post(ENDPOINTS.onboarding.import, body),
};
