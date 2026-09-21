import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const regions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/regions' }),
  schema: z.object({
    country: z.string(),
    region: z.enum([
      'Europe',
      'Eastern Europe',
      'Nordic',
      'North America',
      'Latin America',
      'APAC',
      'Africa',
    ]),
    intro: z.string(),
    languages: z.array(z.string()),
    highlights: z.array(z.string()).min(2).max(5),
    testimonial: z
      .object({
        quote: z.string(),
        name: z.string(),
        role: z.string(),
      })
      .optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    client: z.string(),
    industry: z.string(),
    services: z.array(z.enum(['Link Building', 'Digital PR', 'SEO', 'Influencer Marketing', 'Agency Partnerships'])),
    summary: z.string(),
    results: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ).min(2).max(4),
    publishDate: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { regions, caseStudies, blog };
