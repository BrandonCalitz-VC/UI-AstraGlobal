import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const userInfoSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  national_id: z.string().min(1, "Invalid National ID"),
});

export const bankInfoSchema = z.object({
  account_number: z.string().min(1),
  bank: z.string().min(1),
});

export const authSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  employee: z.boolean().nullable(),
});
