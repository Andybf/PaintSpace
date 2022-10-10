let isServiceWorkerEnabled = false;

function setPageLanguage() {
    document.querySelector('html').lang = navigator.language;
}

function initializeServiceWorker() {
    if ("serviceWorker" in navigator && isServiceWorkerEnabled) {
        navigator.serviceWorker.register("./sw.js").then( (registration) => {
            console.log("SW registred.");
        }).catch( (error) => {
            console.log(error);
        });
    }
}

function initializeAVframework() {
    import('./App/App.js').then( ( appClassDefinition) => {
        customElements.define("comp-app", appClassDefinition.default);
    });
}

setPageLanguage();
initializeAVframework();
initializeServiceWorker();

window.caches.keys().then( cacheKeys => {
    cacheKeys.map( key => {
        window.caches.delete(key);
    });
})