import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    pageType: z.enum(['home', 'pillar']),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    permalink: z.string(),
    primaryIntent: z.string(),
    ownerKeyword: z.string(),
    topicId: z.string().nullable().optional(),
    clusterId: z.string().nullable().optional(),
    brandRefs: z.array(z.string()).default([]),
    planRefs: z.array(z.string()).default([]),
    sourceRefs: z.array(z.string()).default([]),
    publishedAt: z.string(),
    modifiedAt: z.string(),
    verifiedAt: z.string(),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    relatedIds: z.array(z.string()).default([])
  })
});

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    primaryIntent: z.string(),
    pillarId: z.string(),
    topicId: z.string(),
    clusterId: z.string(),
    type: z.enum(['definition', 'condition', 'comparison']),
    publishedAt: z.string().default('2026-10-20'),
    modifiedAt: z.string().default('2026-10-20'),
    status: z.string().default('planned')
  })
});

export const collections = {
  pages: pagesCollection,
  articles: articlesCollection
};
