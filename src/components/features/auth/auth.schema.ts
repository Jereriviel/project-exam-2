import { z } from "zod";

const authSchema = z.object({
  email: z
    .string()
    .trim()
    .min(2, "Email is required")
    .email("Invalid email address")
    .refine((email) => email.endsWith("@stud.noroff.no"), {
      message: "Email must be a valid stud.noroff.no address",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = authSchema;

export const registerSchema = authSchema
  .extend({
    name: z
      .string()
      .trim()
      .min(2, "Name is required")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Name must not contain punctuation symbols apart from underscore (_)",
      ),
    venueManager: z.boolean(),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
