/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 30/jan/2021
 * Type: Image Editor
*/

import Canvas        from './Modules/Canvas.js';
import ToolOptions   from './Modules/ToolOptions.js';
import ThemeSwitcher from './Modules/ThemeSwitcher.js';
import Language      from './Modules/Language.js';
import FloatWindow   from './Modules/FloatWindow.js';

customElements.define("comp-tooloptions",ToolOptions);
let toolOptions = document.querySelector("comp-tooloptions");

customElements.define("comp-canvascontainer", Canvas);
let canvas = document.querySelector("comp-canvascontainer");

customElements.define("comp-floatwindow", FloatWindow);
let floatWindow = document.querySelector("comp-floatwindow");

let theme = new ThemeSwitcher();
let lang = new Language();

/* Navigation Panel ========================================================= */

document.querySelector("button[id*='clear-canvas']").addEventListener('click',
    (event) => { canvas.clearScreen(); }
);

document.querySelector("button[id*='zoom']").addEventListener('click',
    (event) => { canvas.zoom(); }
);

document.querySelector("button[id*='settings']").addEventListener('click',
    () => {
        if (floatWindow.querySelector('section').style['display'] == 'inherit') {
            return false;
        }
        floatWindow.changeTitle('Settings');
        floatWindow.fillContent( [
            {
                name : 'Theme',
                reference : theme,
                settings : [
                    {
                        label   : 'Dark Mode',
                        apiName : 'isDarkMode',
                        func    : 'updateThemeState',
                        type    : 'checkbox'
                    }
                ]
            },
            {
                name : 'Language',
                reference : lang,
                settings : [
                    {
                        label   : 'Selected Language',
                        apiName : 'selectedLanguage',
                        func    : theme.updateThemeState,
                        type    : 'text',//['en-US','pt-BR']
                    }
                ]
            }
        ]);
        floatWindow.querySelector('section').style['display'] = 'inherit'
    }
);

document.querySelector("button[id*='about']").addEventListener('click',
    (event) => { console.log(event); }
);

/* tool panel =============================================================== */

let defaultObject = {
    name     : '',
    bkgColor : '#dddddd',
    border   : 0,
    brdColor : '#222222',
    rotation : 0,
    size     : 20
};
function activate(obj) {
    toolOptions.clear();
    toolOptions.show(obj);
    canvas.activateObject(obj);
}

document.querySelector("button[id*='square']").addEventListener('click',
    (event) => {
        defaultObject.name = 'square';
        activate(defaultObject);
    }
);
document.querySelector("button[id*='circle']").addEventListener('click',
    (event) => {
        defaultObject.name = 'circle';
        activate(defaultObject);
    }
);
document.querySelector("button[id*='triangle']").addEventListener('click',
    (event) => {
        defaultObject.name = 'triangle';
        activate(defaultObject);
    }
);
document.querySelector("button[id*='text']").addEventListener('click',
    (event) => {
        defaultObject.name = 'text';
        activate(defaultObject);
    }
);

/* === */
let hue = 0;
let transitionSpeed = 1000; //ms
let isActive = true;
let timeoutId;
function changeBackgroundColor() {
    hue = hue < 360 ? hue+8 : hue;
    document.querySelector('.title').style.backgroundImage = 
        `linear-gradient(45deg, hsl(`+ hue +`, 80% , 70%),
                                hsl(`+ (hue+100) +`, 80%, 70%))`;
    if (isActive) {
        timeoutId = setTimeout(changeBackgroundColor, transitionSpeed);
    } else {
        clearTimeout(timeoutId);
    }
}
changeBackgroundColor();
