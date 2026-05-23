import { z } from "zod";

export const mediaSchema = z.object({
  url: z.string().trim().url("Please enter a valid image URL"),

  alt: z
    .string()
    .trim()
    .max(120, "Alt text cannot exceed 120 characters")
    .optional()
    .or(z.literal("")),
});

export const venueMetaSchema = z.object({
  wifi: z.boolean().default(false),
  parking: z.boolean().default(false),
  breakfast: z.boolean().default(false),
  pets: z.boolean().default(false),
});

export const venueLocationSchema = z.object({
  address: z.string().trim().optional().or(z.literal("")),

  city: z.string().trim().optional().or(z.literal("")),

  zip: z.string().trim().optional().or(z.literal("")),

  country: z.string().trim().optional().or(z.literal("")),

  continent: z.string().trim().optional().or(z.literal("")),

  lat: z.coerce.number().default(0),

  lng: z.coerce.number().default(0),
});

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

  media: z.array(mediaSchema).optional().default([]),

  price: z.coerce.number().min(0, "Price cannot be negative"),

  maxGuests: z.coerce
    .number()
    .int("Max guests must be a whole number")
    .min(1, "At least 1 guest is required"),

  rating: z.coerce
    .number()
    .min(0, "Rating cannot be below 0")
    .max(5, "Rating cannot exceed 5")
    .optional()
    .default(0),

  meta: venueMetaSchema.default({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  }),

  location: venueLocationSchema.default({
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: 0,
    lng: 0,
  }),
});

export const updateVenueSchema = createVenueSchema.partial();

export type CreateVenueRequest = z.infer<typeof createVenueSchema>;

export type UpdateVenueRequest = z.infer<typeof updateVenueSchema>;
