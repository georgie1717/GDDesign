import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Every case study is one .mdx file in src/content/work/
 * The file name becomes the URL: checkout-conversion.mdx -> /p/checkout-conversion
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    // Shown as the page <h1> and on the work card
    title: z.string(),
    // Orange pill label on the card, e.g. "Product Design"
    category: z.string(),
    // One sentence used for the card, SEO description and social sharing
    summary: z.string(),
    // Paragraphs under the title in the case study hero
    intro: z.array(z.string()).default([]),
    // Role / Platform / Scope rows in the hero
    meta: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    // Card image on the home page
    thumbnail: z.string(),
    // Large image beside the title on the case study page
    hero: z.string().optional(),
    // Lower number = shown first on the home page
    order: z.number().default(99),
    // true hides it from the site completely (safe place to draft)
    draft: z.boolean().default(false),
    // Optional: overrides the year shown on the card
    year: z.string().optional(),
  }),
});

export const collections = { work };
