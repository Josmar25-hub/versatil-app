const CACHE_NAME = 'versatil-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './luna-icon-192.png'
];

// Instala o Service Worker e guarda os ficheiros base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Responde aos pedidos da rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devolve do cache se encontrar, senão vai à internet
        return response || fetch(event.request);
      })
  );
});
