// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Helper Zod qui transforme une Date ou une String en chaîne YYYY-MM-DD
const dateStringSchema = z.union([z.string(), z.date()]).transform((val) => {
  if (val instanceof Date) {
    return val.toISOString().split('T')[0]; // Convertit l'objet Date en "YYYY-MM-DD"
  }
  return String(val);
});

// 1. Schéma des Sorties
const sortiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['a-venir', 'ecoulee']),
    startDate: dateStringSchema,
    endDate:dateStringSchema.optional(),
    dateFormatted: z.string(),
    location: z.string(),
    organizers: z.string().optional(),
    image: z.string().optional(),
    pdfProgram: z.string().optional(),
    description: z.string(),
    slug: z.string().optional(),
  }),
});

// 2. Schéma des Fiches "C'est pas sorcier"
const fichesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Électricité', 'Plomberie', 'Entretien', 'Accessoires', 'Sécurité', 'Mécanique']),
    date: dateStringSchema,
    author: z.string().optional(),
    pdfFile: z.string().optional(),
    description: z.string(),
  }),
});

// 3. Schéma des Pages Statiques
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cotisationPrice: z.string().optional(),
    bulletinPdf: z.string().optional(),
  }),
});

// Export de toutes les collections
export const collections = {
  sorties: sortiesCollection,
  fiches: fichesCollection,
  pages: pagesCollection,
};