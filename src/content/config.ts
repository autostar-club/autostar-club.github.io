// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 1. Schéma des Sorties
const sortiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['a-venir', 'ecoulee']),
    startDate: z.string(),
    endDate: z.string().optional(),
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
    date: z.string(),
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