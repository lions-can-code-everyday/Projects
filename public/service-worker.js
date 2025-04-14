const CACHE_NAME = "lionden9010s-project-hub-cache-v1";
const urlsToCache = [
  "index.html",
  "dist-css/index.css",
  "Cooking-Projects.html",
  "dist-css/Cooking-Projects.css",
  "Chocolate-Chip-Cookies.html",
  "dist-css/Chocolate-Chip-Cookies.css",
  "Field-Trips.html",
  "dist-css/Field-Trips.css",
  "USC.html",
  "dist-css/USC.css",
  "dist-logos/Website/website-icon.ico",
  // Add more assets as needed
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});