import { z } from "zod";

export const createVenueSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Venue name is required")
    .max(100, "Venue name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),

  media: z
    .array(
      z.object({
        url: z.string().trim().url("Please enter a valid image URL"),

        alt: z
          .string()
          .trim()
          .max(120, "Alt text cannot exceed 120 characters")
          .optional()
          .or(z.literal("")),
      }),
    )
    .optional(),

  price: z.number().min(0, "Price cannot be negative"),

  maxGuests: z
    .number()
    .int("Max guests must be a whole number")
    .min(1, "At least 1 guest is required"),

  meta: z.object({
    wifi: z.boolean(),
    parking: z.boolean(),
    breakfast: z.boolean(),
    pets: z.boolean(),
  }),

  location: z.object({
    address: z.string().trim().optional().or(z.literal("")),

    city: z.string().trim().optional().or(z.literal("")),

    zip: z.string().trim().optional().or(z.literal("")),

    country: z.string().trim().optional().or(z.literal("")),
  }),
});

export const updateVenueSchema = createVenueSchema.partial();

export type CreateVenueRequest = z.infer<typeof createVenueSchema>;
export type UpdateVenueRequest = z.infer<typeof updateVenueSchema>;
