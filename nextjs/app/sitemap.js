import { ALL_DYNASTIES } from '../lib/dynastyUtils';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharatam-asmi.vercel.app';

export default function sitemap() {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...ALL_DYNASTIES.map((dynasty) => ({
      url: `${siteUrl}/dynasties/${dynasty.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
