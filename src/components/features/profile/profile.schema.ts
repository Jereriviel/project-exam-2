import { z } from "zod";

export const avatarSchema = z.object({
  url: z.string().trim().url("Please enter a valid image URL"),

  alt: z
    .string()
    .trim()
    .max(120, "Alt text cannot exceed 120 characters")
    .optional()
    .or(z.literal("")),
});

export type AvatarRequest = z.infer<typeof avatarSchema>;

export const bioSchema = z.object({
  bio: z
    .string()
    .trim()
    .max(160, "Bio cannot exceed 160 characters")
    .optional()
    .or(z.literal("")),
});

export type BioRequest = z.infer<typeof bioSchema>;
