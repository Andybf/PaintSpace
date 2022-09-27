const cacheName = 'PaintSpace';
const pathname = '/PaintSpace';
const filesToCache = [];

self.addEventListener("install", (event) => {
    event.waitUntil(performInstalloperations());
});

self.addEventListener('activate', event => {
    performActivationOperations();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(handleFetchRequisition(event));
});

async function performActivationOperations() {
    let keyList = await caches.keys();
    return Promise.all(
        keyList.map(key => {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        })
    );
}

async function performInstalloperations() {
    let clientCache = await caches.open(cacheName);
    for (let fileToCache of filesToCache) {
        await clientCache.add(fileToCache);
    }
}

async function handleFetchRequisition(event) {
    let response = await caches.match(event.request);
    if(!response) {
        response = await fetch(event.request);
        let clientCache = await caches.open(cacheName);
        clientCache.put(event.request, response.clone());
    }
    return response;
}