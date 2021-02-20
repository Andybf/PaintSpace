/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 30/jan/2021
*/

import Canvas        from './Canvas.js';
import ToolOptions   from './ToolOptions.js';
import ThemeSwitcher from './ThemeSwitcher.js';
import Language      from './Language.js';
import FloatWindow   from './FloatWindow.js';

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
    (event) => { 
        canvas.zoom();
    }
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
    (event) => { 
        floatWindow.changeTitle('About');
        floatWindow.fillContent([
            {
                name : 'About',
                reference : undefined,
                settings : [
                    {
                        label : 'PaintSpace ver. 3.0',
                        apiName : '',
                        func    : '',
                        type    : ''
                    }
                ]
            }
        ]);
    }
);

/* tool panel =============================================================== */

let defaultObject = {
    name     : '',
    label    : '',
    options  : [
        {
            key: 'border',
            label : 'Border',
            value : 0,
            type : 'number'
        },
        {
            key: 'brdColor',
            label : 'Border Color',
            value : '#222222',
            type : 'color'
        },
        {
            key: 'size',
            label : 'Size',
            value : 0,
            type : 'number'
        },
        {
            key: 'bkgColor',
            label : 'Bkg Color',
            value : '#dddddd',
            type : 'color'
        },
        {
            key: 'rotation',
            label : 'Rotation',
            value : 0,
            type : 'number'
        },
    ]
}
function activate(obj) {
    canvas.querySelector('canvas').style['cursor'] = 'crosshair';
    toolOptions.clear();
    toolOptions.show(obj);
    canvas.activateObject(obj);
}

function deactivate() {
    canvas.querySelector('canvas').style['cursor'] = 'default';
    toolOptions.clear();
    canvas.activateObject([]);
}

document.querySelector("button[id*='pointer']").addEventListener('click',
    (event) => {
        deactivate();
    }
);
document.querySelector("button[id*='brush']").addEventListener('click',
    (event) => {
        defaultObject.options[0].value = 10;
        defaultObject.name = 'brush';
        defaultObject.label = 'Brush';
        activate(defaultObject);
    }
);
document.querySelector("button[id*='pencil']").addEventListener('click',
    (event) => {
        defaultObject.border = 1;
        defaultObject.label = 'Pencil';
        defaultObject.name = 'pencil';
        activate(defaultObject);
    }
);
document.querySelector("button[id*='line']").addEventListener('click',
    (event) => {
        defaultObject.border = 1;
        defaultObject.label = 'Line';
        defaultObject.name = 'line';
        activate(defaultObject);
    }
);
document.querySelector("button[id*='square']").addEventListener('click',
    (event) => {
        defaultObject.label = 'Square';
        defaultObject.name = 'square';
        activate(defaultObject);
    }
);
document.querySelector("button[id*='circle']").addEventListener('click',
    (event) => {
        defaultObject.label = 'Circle';
        defaultObject.name = 'circle';
        activate(defaultObject);
    }
);
document.querySelector("button[id*='triangle']").addEventListener('click',
    (event) => {
        defaultObject.label = 'Triangle';
        defaultObject.name = 'triangle';
        activate(defaultObject);
    }
);
document.querySelector("button[id*='text']").addEventListener('click',
    (event) => {
        defaultObject.label = 'Text';
        defaultObject.name = 'text';
        activate(defaultObject);
    }
);

/* Title Color Change ======================================================= */

let hue = 0;
let transitionSpeed = 999; //ms
let isActive = true;
let timeoutId;
function changeBackgroundColor() {
    if (hue < 360 && hue >= 0) {
        hue += 4;
    } else {
        hue = 0;
    }
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
