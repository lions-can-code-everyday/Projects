const CACHE_NAME = "project-hub-cache-v1";
const urlsToCache = [
  "./index.html",
  "./styles.css",
  "./Cooking-Projects.html",
  "./Field-Trips.html",
  "./USC.html",
  "./dist-logos/Website/website-icon.ico",
  "./dist-images/USC-Field-Trip/DSC00003.JPG",
  "./dist-images/USC-Field-Trip/DSC00004.JPG",
  "./dist-images/USC-Field-Trip/DSC00005.JPG"
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