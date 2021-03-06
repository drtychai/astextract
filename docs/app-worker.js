const cacheName = "app-" + "1d803cfd4223967be62c5c3408633d866795bf4f";

self.addEventListener("install", event => {
  console.log("installing app worker 1d803cfd4223967be62c5c3408633d866795bf4f");
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        "/astextract",
        "/astextract/app.css",
        "/astextract/app.js",
        "/astextract/manifest.json",
        "/astextract/wasm_exec.js",
        "/astextract/web/app.wasm",
        "https://storage.googleapis.com/murlok-github/icon-192.png",
        "https://storage.googleapis.com/murlok-github/icon-512.png",
        "https://unpkg.com/spectre.css/dist/spectre.min.css",
        
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  console.log("app worker 1d803cfd4223967be62c5c3408633d866795bf4f is activated");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
