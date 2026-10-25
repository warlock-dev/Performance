// Offline cache for APEX. The cache name carries the build hash, so a new build replaces the old copy.
const CACHE = 'apex-461407026fb3';
const FILES = ['./apex.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return; // Google calls are never cached
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
