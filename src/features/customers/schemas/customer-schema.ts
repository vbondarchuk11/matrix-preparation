import {
  CUSTOMER_HEALTH_OPTIONS,
  CUSTOMER_PLAN_OPTIONS,
  CUSTOMER_SEGMENT_OPTIONS,
  CUSTOMER_STATUS_OPTIONS,
} from "@/constants/crm";
import { z } from "zod";

export const customerSchema = z.object({
  company: z.string().min(2, "Company name is required."),
  industry: z.string().min(2, "Industry is required."),
  owner: z.string().min(2, "Owner is required."),
  email: z.string().email("Enter a valid email."),
  status: z.enum(CUSTOMER_STATUS_OPTIONS),
  health: z.enum(CUSTOMER_HEALTH_OPTIONS),
  plan: z.enum(CUSTOMER_PLAN_OPTIONS),
  region: z.string().min(2, "Region is required."),
  segment: z.enum(CUSTOMER_SEGMENT_OPTIONS),
  mrr: z.coerce.number().min(0, "MRR cannot be negative."),
  arr: z.coerce.number().min(0, "ARR cannot be negative."),
  createdAt: z.string().min(1, "Created date is required."),
  renewalDate: z.string().min(1, "Renewal date is required."),
  contacts: z.coerce.number().min(0),
  openDeals: z.coerce.number().min(0),
  notes: z.string().min(4, "Add a short account note."),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
