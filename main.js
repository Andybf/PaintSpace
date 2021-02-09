/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 30/jan/2021
 * Type: Experimental Software
*/

import Canvas from './Modules/Canvas.js';

console.log('Main Initialized.');

customElements.define("comp-canvascontainer", Canvas);
let canvas = document.querySelector("comp-canvascontainer");

document.querySelector("button[id*='clear-canvas']").addEventListener('click',
    (event) => {
        canvas.clearScreen();
    }
);

document.querySelector("button[id*='zoom']").addEventListener('click',
    (event) => {
        canvas.zoom();
    }
);