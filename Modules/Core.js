/*
 * PaintSpace ver. 3.0
 * Created By: Anderson Bucchianico
 *       Date: 30/jan/2021
*/

import Canvas
    from './Canvas.js';
import Resize
    from './Resize.js';
import ToolOptions
    from './ToolOptions.js';
import ThemeSwitcher
    from './ThemeSwitcher.js';
import Language
    from './Language.js';
import FloatWindow 
    from './FloatWindow.js';
import LoadImage
    from './FloatWindowSubModules/LoadImage.js';
import About
    from './FloatWindowSubModules/About.js';
import Settings
    from './FloatWindowSubModules/Settings.js';

customElements.define("comp-tooloptions",ToolOptions);
let toolOptions = document.querySelector("comp-tooloptions");

customElements.define("comp-canvascontainer", Canvas);
let canvas = document.querySelector("comp-canvascontainer");

customElements.define("comp-resize", Resize);
let resize = document.querySelector("comp-resize");
resize.init(canvas);

customElements.define("comp-floatwindow", FloatWindow);
let floatWindow = document.querySelector("comp-floatwindow");

customElements.define("comp-loadimage",LoadImage);
customElements.define("comp-settings",Settings);
customElements.define("comp-about",About);

let theme = new ThemeSwitcher();
let lang = new Language();

/* Navigation Panel ========================================================= */

document.querySelector("button[id*='load-image']").addEventListener('click',
    (event) => {
        let LoadImageClass = customElements.get('comp-loadimage');
        let limg = new LoadImageClass();
        limg.init(canvas,resize);
        floatWindow.fillContent(limg);
        floatWindow.makeVisible();
    }
);

document.querySelector("button[id*='save-image']").addEventListener('click',
    (event) => {
        var image = canvas.querySelector('canvas').toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href=image;
    }
);

document.querySelector("button[id*='clear-canvas']").addEventListener('click',
    (event) => { canvas.clearScreen(); }
);

document.querySelector("button[id*='zoom']").addEventListener('click',
    (event) => { 
        canvas.zoom();
    }
);

document.querySelector("button[id*='resolution']").addEventListener('click',
    (event) => {
        floatWindow.makeVisible();
    }
);

document.querySelector("button[id*='settings']").addEventListener('click',
    (event) => {
        let Setting = customElements.get('comp-settings');
        let st = new Setting();
        st.init(theme,lang);
        floatWindow.fillContent(st);
        floatWindow.makeVisible();
    }
);

document.querySelector("button[id*='about']").addEventListener('click',
    (event) => { 
        let Ab = customElements.get('comp-about');
        let ab = new Ab();
        floatWindow.fillContent(ab);
        floatWindow.makeVisible();
    }
);

/* tool panel =============================================================== */

let drawToolModel = {
    name     : '',
    label    : '',
    cursor   : 'default',
    options  : {}
}
function selectTool(tool) {
    toolOptions.deactivateCurrentTool();
    toolOptions.show(tool);
    canvas.activateObject(tool);
}

document.querySelector("button[id*='pointer']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Pointer';
        drawToolModel.name = 'pointer';
        drawToolModel.cursor = 'default';
        drawToolModel.options = {};
        selectTool(drawToolModel);
    }
);
document.querySelector("button[id*='brush']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Brush';
        drawToolModel.name = 'brush';
        drawToolModel.cursor = 'crosshair';
        drawToolModel.options = {
            border : {
                label : 'Size',
                value : 10,
                type : 'number'
            },
            brdColor : {
                label : 'Brush Color',
                value : '#222222',
                type : 'color'
            }
        }
        selectTool(drawToolModel);
    }
);
document.querySelector("button[id*='pencil']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Pencil';
        drawToolModel.name = 'pencil';
        drawToolModel.cursor = 'crosshair';
        drawToolModel.options = {
            border : {
                label : 'Size',
                value : 1,
                type : 'number'
            },
            brdColor : {
                label : 'Pencil Color',
                value : '#222222',
                type : 'color'
            }
        }
        selectTool(drawToolModel);
    }
);
document.querySelector("button[id*='line']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Line';
        drawToolModel.name = 'line';
        drawToolModel.cursor = 'crosshair';
        drawToolModel.options = {
            border : {
                label : 'Size',
                value : 1,
                type : 'number'
            },
            brdColor : {
                label : 'Pencil Color',
                value : '#222222',
                type : 'color'
            }
        }
        selectTool(drawToolModel);
    }
);
document.querySelector("button[id*='square']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Square';
        drawToolModel.name = 'square';
        drawToolModel.cursor = 'crosshair';
        drawToolModel.options = {
            border : {
                label : 'Border',
                value : 1,
                type : 'number'
            },
            brdColor : {
                label : 'Border Color',
                value : '#222222',
                type : 'color'
            },
            bkgColor : {
                label : 'Bkg Color',
                value : '#dddddd',
                type : 'color'
            },
            rotation : {
                label : 'Rotation',
                value : 0,
                type : 'number'
            },
        }
        selectTool(drawToolModel);
    }
);
document.querySelector("button[id*='circle']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Circle';
        drawToolModel.name = 'circle';
        drawToolModel.cursor = 'crosshair';
        drawToolModel.options = {
            border : {
                label : 'Border',
                value : 1,
                type : 'number'
            },
            brdColor : {
                label : 'Border Color',
                value : '#222222',
                type : 'color'
            },
            bkgColor : {
                label : 'Bkg Color',
                value : '#dddddd',
                type : 'color'
            }
        }
        selectTool(drawToolModel);
    }
);
document.querySelector("button[id*='triangle']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Triangle';
        drawToolModel.name = 'triangle';
        drawToolModel.cursor = 'crosshair';
        drawToolModel.options = {

        }
        selectTool(drawToolModel);
    }
);
document.querySelector("button[id*='text']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Text';
        drawToolModel.name = 'text';
        drawToolModel.cursor = 'text';
        drawToolModel.options = {
            contentText : {
                label : 'Content',
                value : 'test',
                type : 'text'
            },
            bkgColor : {
                label : 'Bkg Color',
                value : '#dddddd',
                type : 'color'
            },
            fontSize : {
                label : 'Font Size',
                value : 30,
                type : 'number'
            },
            fontFamily : {
                label : 'Font Family',
                value : 'Comic Sans MS',
                type : 'text'
            }
        }
        selectTool(drawToolModel);
    }
);
document.querySelector("button[id*='color-picker']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Color Picker';
        drawToolModel.name = 'color-picker';
        drawToolModel.cursor = 'default';
        drawToolModel.options = {
            
        }
        selectTool(drawToolModel);
    }
);
document.querySelector("button[id*='eraser']").addEventListener('click',
    (event) => {
        drawToolModel.label = 'Eraser';
        drawToolModel.name = 'eraser';
        drawToolModel.cursor = 'crosshair';
        drawToolModel.options = {
            
        }
        selectTool(drawToolModel);
    }
);

/* Title Color Change ======================================================= */

let hue = 160;
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

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then( (registration) => {
        console.log("SW registred.",registration)
    }).catch( (error) => {
        console.log(error);
    });
}