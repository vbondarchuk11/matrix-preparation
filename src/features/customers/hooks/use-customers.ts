import {
  CUSTOMER_HEALTH,
  CUSTOMER_PLAN,
  CUSTOMER_SEGMENT,
  CUSTOMER_STATUS,
  DEFAULT_CREATED_DATE,
  DEFAULT_CUSTOMER_REGION,
  DEFAULT_RENEWAL_DATE,
} from "@/constants/crm";
import { useToast } from "@/hooks/use-toast";
import { customerService } from "@/services/customer-service";
import type { Customer } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryKey = ["customers"];

export function useCustomers() {
  return useQuery({
    queryKey,
    queryFn: customerService.list,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  const { push } = useToast();

  return useMutation({
    mutationFn: customerService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      push({
        title: "Customer created",
        description: "The account was added to your CRM.",
        variant: "success",
      });
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  const { push } = useToast();

  return useMutation({
    mutationFn: customerService.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      push({
        title: "Customer updated",
        description: "Changes have been synced.",
        variant: "success",
      });
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const { push } = useToast();

  return useMutation({
    mutationFn: (id: string) => customerService.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      push({
        title: "Customer removed",
        description: "The record has been deleted.",
        variant: "success",
      });
    },
  });
}

export function getCustomerDefaultValues(customer?: Customer) {
  return {
    company: customer?.company ?? "",
    industry: customer?.industry ?? "",
    owner: customer?.owner ?? "",
    email: customer?.email ?? "",
    status: customer?.status ?? CUSTOMER_STATUS.LEAD,
    health: customer?.health ?? CUSTOMER_HEALTH.HEALTHY,
    plan: customer?.plan ?? CUSTOMER_PLAN.GROWTH,
    region: customer?.region ?? DEFAULT_CUSTOMER_REGION,
    segment: customer?.segment ?? CUSTOMER_SEGMENT.COMMERCIAL,
    mrr: customer?.mrr ?? 0,
    arr: customer?.arr ?? 0,
    createdAt: customer?.createdAt ?? DEFAULT_CREATED_DATE,
    renewalDate: customer?.renewalDate ?? DEFAULT_RENEWAL_DATE,
    contacts: customer?.contacts ?? 2,
    openDeals: customer?.openDeals ?? 1,
    notes: customer?.notes ?? "",
  } as const;
}
