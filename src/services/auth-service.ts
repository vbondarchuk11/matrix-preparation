import { api } from "@/services/api";
import type { User } from "@/types";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
  },
};
