// Installation: Store offline page
self.addEventListener('install', function(event) {
    var offlineSite = new Request('offline');
    event.waitUntil(
        fetch(offlineSite).then(function(response) {
            return caches.open('mypwa-offline').then(function(cache) {
                console.log('[PWA Info] Cached offline page');
                return cache.put(offlineSite, response);
            });
        }));
});

// Serve offline page if the fetch fails
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function(error) {
                console.error( '[PWA Info] App offline. Serving stored offline page: ' + error );
                return caches.open('mypwa-offline').then(function(cache) {
                    return cache.match('offline');
                });
            }
        ));
});

// Event to update the offline page
self.addEventListener('refreshOffline', function(response) {
    return caches.open('mypwa-offline').then(function(cache) {
        console.log('[PWA Info] Offline page updated');
        return cache.put(offlineSite, response);
    });
});