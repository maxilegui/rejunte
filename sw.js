const contentToCache = [
    '/index.html',
    '/Upload.html',
    '/Save.html',
    '/Routing.js',
    '/LocalStorageService.js'
  ];
  
  self.addEventListener('install', (e) => {
  console.log("[SERVICE WORKER] INSTALL DATA");
  e.waitUntil((async () => {
    const cache = await caches.open("Baum-App");
    await cache.addAll(contentToCache);
  })());
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open("Baum-App");
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  })