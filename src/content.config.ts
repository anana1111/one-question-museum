import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const exhibits = defineCollection({
 loader: glob({ pattern: '*.json', base: './src/content/exhibits', generateId: ({entry}) => entry.replace(/\.json$/, '') }),
 schema: z.object({ id: z.string().regex(/^\d{3}$/), title: z.string(), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), project: z.string(), hall: z.string(), stuckHours: z.number().nonnegative(), outcome: z.enum(['solved','bypassed','unsolved']), oneLiner: z.string(), status: z.enum(['published','planned']), locale: z.enum(['zh','ja','en']).default('zh'), demo: z.boolean().default(false), context: z.string(), resolution: z.string(), interaction: z.string().default('none') })
});
export const collections = { exhibits };
