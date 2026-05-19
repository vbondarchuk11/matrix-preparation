import { api } from "@/services/api";
import type { Customer } from "@/types";

export const customerService = {
  async list() {
    const { data } = await api.get<Customer[]>("/customers");
    return data;
  },
  async create(payload: Omit<Customer, "id">) {
    const { data } = await api.post<Customer>("/customers", payload);
    return data;
  },
  async update(payload: Customer) {
    const { data } = await api.put<Customer>(
      `/customers/${payload.id}`,
      payload,
    );
    return data;
  },
  async remove(id: string) {
    await api.delete(`/customers/${id}`);
  },
};
