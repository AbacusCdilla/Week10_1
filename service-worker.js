var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'petstore.webmamifest',
    'images/',

];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

// <self.addEventListener('fetch', function (e) {
//    e.respondWith(
//     check if the request is for a file in the cache
//    caches.match(e.request).then(function (r) {
//            console.log('[Service Worker] Fetching resource: ', e.request.url);
//             'r' is the matching file if it exists, otherwise undefined
//            return r
//        })
//    );
// });

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download request if it wasn't a cache hit,
            return r || fetch(e.request).then(function (response) {
                // add the response to the cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});