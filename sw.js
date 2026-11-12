// PORO ACADEMY service worker: সবসময় সর্বশেষ ভার্সন আগে (network-first), নেট না থাকলে শেষ সেভ করা পেজ
const C = 'poro-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r).then((res) => {
      if (res.ok) { const cp = res.clone(); caches.open(C).then((c) => c.put(r, cp)); }
      return res;
    }).catch(() => caches.match(r).then((m) => m || caches.match('/')))
  );
});
