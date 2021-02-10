const CACHE_NAME = "cache";
const OFFLINE_URL = "/";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    return cache.add(OFFLINE_URL);
  })());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (e) {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match("/");
        return cachedResponse;
      }
    })()
  );
});
