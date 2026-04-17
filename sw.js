const CACHE = 'bulhandangdeul-v1';
const FILES = [
  '/bulhandangdeul/',
  '/bulhandangdeul/index.html',
  '/bulhandangdeul/manifest.json',
  '/bulhandangdeul/sw.js',
  '/bulhandangdeul/icon-192.png',
  '/bulhandangdeul/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/bulhandangdeul/index.html')))
  );
});
