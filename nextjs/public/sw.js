const STATIC_CACHE = 'bharatam-static-v1';
const IMAGE_CACHE = 'bharatam-images-v1';
const APP_SHELL = [
  '/',
  '/images/logo.png',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/battle-default.png',
  '/audio/bg-music.mp3',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![STATIC_CACHE, IMAGE_CACHE].includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/').then((response) => response || caches.match(request))),
    );
    return;
  }

  if (url.origin === self.location.origin || url.hostname === 'upload.wikimedia.org') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          return cached;
        }

        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      }),
    );
  }
});
