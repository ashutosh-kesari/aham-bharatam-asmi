export default function manifest() {
  return {
    name: 'BHARATAM',
    short_name: 'Bharatam',
    description: 'Explore Indian dynasties, timelines, battles, maps, and quizzes across the ages.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070604',
    theme_color: '#c8942a',
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
