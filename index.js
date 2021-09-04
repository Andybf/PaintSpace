/*
 * PaintSpace ver. 3.0
 * Created By: Anderson Bucchianico
 *       Date: 30/jan/2021
*/

import('/App/App.js').then( ( appClassDefinition) => {
    customElements.define("comp-app", appClassDefinition.default);
})

// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("sw.js").then( (registration) => {
//         console.log("SW registred.",registration)
//     }).catch( (error) => {
//         console.log(error);
//     });
// }