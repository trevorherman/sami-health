const CACHE_NAME = 'sami-health-v4';

// Cache relative paths + CDN resources
const LOCAL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

const CDN_ASSETS = [
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://unpkg.com/recharts@2.5.0/umd/Recharts.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local assets first (these should always succeed)
      return cache.addAll(LOCAL_ASSETS).then(() => {
        // Try to cache CDN assets but don't fail install if they don't load
        return Promise.allSettled(CDN_ASSETS.map(url => cache.add(url)));
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // If both cache and network fail, return a simple offline page
        if (event.request.mode === 'navigate') {
          return new Response('<h1>Offline</h1><p>Please connect to the internet and try again.</p>', {
            headers: { 'Content-Type': 'text/html' }
          });
        }
      });
    })
  );
});
