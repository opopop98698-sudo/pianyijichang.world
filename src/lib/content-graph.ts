import contentMapData from '../data/content-map.json';
import brandsData from '../data/brands.json';

export interface ArticleMeta {
  title: string;
  intent: string;
  primaryIntent: string;
  type: 'definition' | 'condition' | 'comparison';
  clusterId: string;
  topicId: string;
  pillarId: string;
  status: string;
  slug: string;
}

export interface ClusterMeta {
  id: string;
  name: string;
  articles: ArticleMeta[];
}

export interface TopicMeta {
  id: string;
  name: string;
  clusters: ClusterMeta[];
}

export interface PillarMeta {
  id: string;
  name: string;
  topics: TopicMeta[];
}

export const getPillars = (): PillarMeta[] => {
  return contentMapData as PillarMeta[];
};

export const getPillarById = (pillarId: string): PillarMeta | undefined => {
  return (contentMapData as PillarMeta[]).find((p) => p.id === pillarId);
};

export const getTopicById = (pillarId: string, topicId: string): TopicMeta | undefined => {
  const pillar = getPillarById(pillarId);
  return pillar?.topics.find((t) => t.id === topicId);
};

export const getAllTopics = (): { pillar: PillarMeta; topic: TopicMeta }[] => {
  const result: { pillar: PillarMeta; topic: TopicMeta }[] = [];
  for (const pillar of contentMapData as PillarMeta[]) {
    for (const topic of pillar.topics) {
      result.push({ pillar, topic });
    }
  }
  return result;
};

export const getAllArticles = (): ArticleMeta[] => {
  const result: ArticleMeta[] = [];
  for (const pillar of contentMapData as PillarMeta[]) {
    for (const topic of pillar.topics) {
      for (const cluster of topic.clusters) {
        result.push(...cluster.articles);
      }
    }
  }
  return result;
};

export const getArticleBySlug = (slug: string): ArticleMeta | undefined => {
  return getAllArticles().find((a) => a.slug === slug);
};

export const getBrands = () => {
  return brandsData;
};

export const getBrandById = (id: string) => {
  return brandsData.find((b) => b.id === id);
};
