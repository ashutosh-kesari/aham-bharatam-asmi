import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDynastyBySlug, ALL_DYNASTIES, getDynastyHref, ERA_LABELS } from '../../../lib/dynastyUtils';
import { getMapsForDynasty } from '../../../lib/historicalMaps';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharatam-asmi.vercel.app';

export function generateStaticParams() {
  return ALL_DYNASTIES.map((dynasty) => ({ slug: dynasty.slug }));
}

export function generateMetadata({ params }) {
  const dynasty = getDynastyBySlug(params.slug);

  if (!dynasty) {
    return {
      title: 'Dynasty Not Found | BHARATAM',
    };
  }

  const relatedMap = getMapsForDynasty(dynasty.id)[0];
  const title = `${dynasty.name} | BHARATAM`;
  const description = `${dynasty.period} · ${dynasty.region} · ${dynasty.summary}`;
  const url = `${siteUrl}${getDynastyHref(dynasty.id)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: relatedMap
        ? [
            {
              url: relatedMap.image,
              width: relatedMap.width,
              height: relatedMap.height,
              alt: relatedMap.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: relatedMap ? [relatedMap.image] : undefined,
    },
  };
}

export default function DynastyPage({ params }) {
  const dynasty = getDynastyBySlug(params.slug);

  if (!dynasty) {
    notFound();
  }

  const relatedMaps = getMapsForDynasty(dynasty.id);

  return (
    <main className="dyn-route">
      <div className="dyn-route__hero">
        <div className="dyn-route__eyebrow">{ERA_LABELS[dynasty.era]} Dynasty</div>
        <h1 className="dyn-route__title">{dynasty.name}</h1>
        <p className="dyn-route__meta">
          <span>{dynasty.period}</span>
          <span>{dynasty.region}</span>
          <span>Founder: {dynasty.founder}</span>
        </p>
        <p className="dyn-route__summary">{dynasty.summary}</p>
        <div className="dyn-route__actions">
          <Link className="dyn-route__button" href="/">
            Back to Home
          </Link>
        </div>
      </div>

      <section className="dyn-route__section">
        <div className="dyn-route__section-eye">Ruler Timeline</div>
        <div className="dyn-route__timeline">
          {dynasty.rulers.map((ruler, index) => (
            <article key={`${ruler.name}-${index}`} className="dyn-route__timeline-card">
              <div className="dyn-route__timeline-reign">{ruler.reign}</div>
              <h2 className="dyn-route__timeline-name">{ruler.name}</h2>
              <p className="dyn-route__timeline-copy">{ruler.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {relatedMaps.length > 0 && (
        <section className="dyn-route__section">
          <div className="dyn-route__section-eye">Historical Map</div>
          {relatedMaps.map((map) => (
            <article key={map.id} className="dyn-route__map-card">
              <div className="dyn-route__map-media">
                <Image
                  src={map.image}
                  alt={map.title}
                  width={map.width}
                  height={map.height}
                  sizes="(max-width: 960px) 100vw, 900px"
                />
              </div>
              <div className="dyn-route__map-copy">
                <h2>{map.title}</h2>
                <p>{map.description}</p>
                <p className="dyn-route__map-footnote">{map.sourceNote}</p>
                <a href={map.sourceUrl} target="_blank" rel="noreferrer">
                  Source
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
