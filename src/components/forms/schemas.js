import { z } from 'zod'

export const bookingSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email({ message: 'Enter a valid email' }),
  phone: z.string().min(8, 'Enter a reachable phone number'),
  travellers: z.coerce.number().min(1).max(20),
  departureDate: z.string().min(1, 'Choose a departure date'),
  notes: z.string().optional(),
})

export const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email({ message: 'Enter a valid email' }),
  phone: z.string().min(8),
  departureDate: z.string().optional(),
  destination: z.string().optional(),
  notes: z.string().optional(),
})

export const tourAdminSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  summary: z.string().min(10),
  description: z.string().min(20),
  priceFrom: z.coerce.number().positive(),
  nights: z.coerce.number().optional(),
  category: z.string().min(2),
  depositNote: z.string().optional(),
  featured: z.boolean(),
  tagsInput: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  includedText: z.string(),
  excludedText: z.string(),
  itinerary: z
    .array(z.object({ title: z.string().min(1), detail: z.string().min(1) }))
    .min(1),
  images: z.array(z.string()).optional(),
})

export const blogAdminSchema = z.object({
  title: z.string().min(4),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  coverImage: z.string().optional(),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  contentHtml: z.string().min(8),
  galleryImages: z.array(z.string()).optional(),
})
