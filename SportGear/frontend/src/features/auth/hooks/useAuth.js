import { useAuthStore } from "../../../app/store/authStore";

export function useAuth() {
  return useAuthStore();
}
