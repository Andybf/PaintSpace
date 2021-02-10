/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 30/jan/2021
 * Type: Image Editor
*/

import Canvas      from './Modules/Canvas.js';
import ToolOptions from './Modules/ToolOptions.js';

customElements.define("comp-tooloptions",ToolOptions);
let toolOptions = document.querySelector("comp-tooloptions");

customElements.define("comp-canvascontainer", Canvas);
let canvas = document.querySelector("comp-canvascontainer");

document.querySelector("button[id*='clear-canvas']").addEventListener('click',
    (event) => { canvas.clearScreen(); }
);

document.querySelector("button[id*='zoom']").addEventListener('click',
    (event) => { canvas.zoom(); }
);

/* tool panel =============================================================== */

function activate(obj) {
    toolOptions.clear();
    toolOptions.show(obj);
    canvas.activateObject(obj);
}

document.querySelector("button[id*='square']").addEventListener('click',
    (event) => {
        activate({
            name     : 'square',
            bkgColor : '#111111',
            border   : 0,
            brdColor : '#222222',
            rotation : 0,
            size     : 10
        });
        
    }
);
document.querySelector("button[id*='circle']").addEventListener('click',
    (event) => {
        activate({
            name     : 'circle',
            bkgColor : '#111111',
            border   : 0,
            brdColor : '#222222',
            rotation : 0,
            size     : 10
        });
    }
);
document.querySelector("button[id*='triangle']").addEventListener('click',
    (event) => {
        activate({
            name     : 'triangle',
            bkgColor : '#111111',
            border   : 0,
            brdColor : '#222222',
            rotation : 0,
            size     : 10
        });
    }
);
document.querySelector("button[id*='text']").addEventListener('click',
    (event) => {
        activate({
            name     : 'text',
            bkgColor : '#111111',
            border   : 0,
            brdColor : '#222222',
            rotation : 0,
            size     : 10
        });
    }
);

/* languages ================================================================ */

let languages =
    {
    'en-US' : [
        { key : 'load-image',   value : 'Load Image' },
        { key : 'save-image',   value : 'Save Image' },
        { key : 'clear-canvas', value : 'Clear Canvas'},
        { key : 'resolution',   value : 'Change Resolution'},
        { key : 'zoom',         value : 'Zoom'},
        { key : 'settings',     value : 'Settings'},
        { key : 'about',        value : 'About'},
    ],
    'pt-BR' : [
        { key : 'load-image',   value : 'Carregar Imagem' },
        { key : 'save-image',   value : 'Salvar Imagem' },
        { key : 'clear-canvas', value : 'Limpar Canvas'},
        { key : 'resolution',   value : 'Mudar Resolução'},
        { key : 'zoom',         value : 'Zoom'},
        { key : 'settings',     value : 'Configurações'},
        { key : 'about',        value : 'Sobre'},
    ]
};
let selectedLanguage = navigator.language;
languages[selectedLanguage].forEach( (item,index) => {
    document.querySelector("#"+item['key']).innerText = item['value'];
});