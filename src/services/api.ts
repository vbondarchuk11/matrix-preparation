import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10_000,
  adapter: async (config) => {
    const response = await fetch(`${config.baseURL}${config.url}`, {
      method: config.method?.toUpperCase(),
      body: config.data ? JSON.stringify(config.data) : undefined,
      headers: config.headers as HeadersInit,
    });

    const data = response.status === 204 ? null : await response.json();
    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      config,
      request: null,
    };
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Content-Type"] = "application/json";
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();
    }

    return Promise.reject(error);
  },
);
