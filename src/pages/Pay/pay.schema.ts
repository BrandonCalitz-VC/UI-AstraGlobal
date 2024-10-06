import { z } from "zod";

export const paySchema = z.object({
  amount: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().positive("Amount must be a positive number")
  ),
  currency: z.string(),
  account_to: z.string().min(1),
  provider: z.string(),
  value_1: z.string().optional(),
  value_2: z.string().optional(),
});

export const paymentSchema = z.object({
    amount: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive("Amount must be a positive number")
    ),
    currency: z.string(),
    account_to: z.string().min(1),
  });

export const providerSchema = z.object({
  provider: z.string(),
  value_1: z.string().optional(),
  value_2: z.string().optional(),
})
.superRefine((values, ctx) => {
  if (values.provider === "Swift" && (!values.value_1 || values.value_1.length === 0)) {
    ctx.addIssue({
      code: "custom",
      message: "Swift code is required when provider is Swift",
      path: ["value_1"],
    });
  }
});