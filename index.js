/*
 * PaintSpace ver. 3.0
 * Created By: Anderson Bucchianico
 *       Date: 30/jan/2021
*/

let isServiceWorkerEnabled = false;

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

initializeAVframework();