/*
 * PaintSpace ver. 3.0
 * Created By: Anderson Bucchianico
 *       Date: 30/jan/2021
*/

/* Imports Section ========================================================== */

import Canvas
    from './Canvas.js';
import Resize
    from './Resize.js';
import ToolOptions
    from './ToolOptions.js';
import ThemeSwitcher
    from './ThemeSwitcher.js';
import FloatWindow 
    from './SidePanel.js';
import LoadImage
    from './SidePanelModules/LoadImage.js';
import About
    from './SidePanelModules/About.js';
import Settings
    from './SidePanelModules/Settings.js';
import ChangeResolution
    from './SidePanelModules/ChangeResolution.js';
import Language
    from './Language.js';

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
let LoadImageClass = customElements.get('comp-loadimage');
let limg = new LoadImageClass();
limg.init(canvas,resize);

customElements.define("comp-settings",Settings);
let Setting = customElements.get('comp-settings');
let st = new Setting();
let theme = new ThemeSwitcher();
let lang = new Language();
st.init(theme,lang,canvas);

customElements.define('comp-changeresolution',ChangeResolution);
let CR = customElements.get('comp-changeresolution');
let cr = new CR();
cr.init(canvas,resize);

customElements.define("comp-about",About);
let Ab = customElements.get('comp-about');
let ab = new Ab();




/* Navigation Panel ========================================================= */

document.querySelector("button[id*='load-image']").addEventListener('click',
    (event) => {
        floatWindow.fillContent(limg);
        floatWindow.makeVisible();
    }
);

document.querySelector("button[id*='save-image']").addEventListener('click',
    (event) => {
        window.location.href = canvas.canvasNode.toDataURL()
            .replace("image/png", "image/octet-stream");
    }
);

document.querySelector("button[id*='clear-canvas']").addEventListener('click',
    (event) => {
        canvas.clearScreen();
    }
);

document.querySelector("button[id*='resolution']").addEventListener('click',
    (event) => {
        cr.showCanvasDimensions();
        floatWindow.fillContent(cr);
        floatWindow.makeVisible();
    }
);

document.querySelector("button[id*='settings']").addEventListener('click',
    (event) => {
        floatWindow.fillContent(st);
        floatWindow.makeVisible();
    }
);

document.querySelector("button[id*='about']").addEventListener('click',
    (event) => {
        floatWindow.fillContent(ab);
        floatWindow.makeVisible();
    }
);

/* drawning tools panel ===================================================== */

function selectTool(tool) {
    toolOptions.deactivateCurrentTool();
    toolOptions.show(tool);
    canvas.activateObject(tool);
}

document.querySelector("button[id='pointer']").addEventListener('click',
    (event) => {
        selectTool({
            name     : 'pointer',
            label    : 'Pointer',
            cursor   : 'default',
            drawDownFunc : function() {},
            drawMoveFunc : function() {},
            drawUpFunc   : function() {},
            options  : {}
        });
    }
);
document.querySelector("button[id='brush']").addEventListener('click',
    (event) => {
        selectTool({
            name         : 'brush',
            label        : 'Brush',
            cursor       : 'crosshair',
            eventsActive : true,
            drawDownFunc : function(canvasNode,event) {
                canvasNode.context.beginPath();
                canvasNode.context.arc(
                    event.layerX, event.layerY,
                    this.options['border'].value/2, 0, 2 * Math.PI
                );
                canvasNode.context.fillStyle = this.options['brdColor'].value;
                canvasNode.context.fill();
                canvasNode.context.closePath();
                canvasNode.context.beginPath();
            },
            drawMoveFunc : function(canvasNode,event) {
                canvasNode.context.lineTo(event.layerX, event.layerY);
                canvasNode.drawBorder();
            },
            drawUpFunc   : function(canvasNode,event) {
                canvasNode.context.closePath();
                canvasNode.context.beginPath();
                canvasNode.context.arc(
                    event.layerX, event.layerY,
                    this.options['border'].value/2, 0, 2 * Math.PI
                );
                canvasNode.context.fillStyle = this.options['brdColor'].value;
                canvasNode.context.fill();
                canvasNode.context.closePath();
                canvasNode.context.beginPath();
                canvasNode.context.lineTo(event.layerX, event.layerY);
            },
            options  : {
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
        });
    }
);
document.querySelector("button[id='pencil']").addEventListener('click',
    (event) => {
        selectTool({
            name     : 'pencil',
            label    : 'Pencil',
            cursor   : 'crosshair',
            eventsActive : true,
            drawDownFunc : function(canvasNode,event) {
                canvasNode.context.beginPath();
            },
            drawMoveFunc : function(canvasNode,event) {
                canvasNode.context.lineTo(event.layerX, event.layerY);
                canvasNode.drawBorder();
            },
            drawUpFunc   : () => {},
            options  : {
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
        });
    }
);
document.querySelector("button[id*='line']").addEventListener('click',
    (event) => {
        selectTool({
            name     : 'line',
            label    : 'Line',
            cursor   : 'crosshair',
            drawDownFunc : function(canvasNode,event) {
                canvasNode.context.beginPath();
                canvasNode.context.moveTo(event.layerX, event.layerY);
            },
            drawMoveFunc : () => {},
            drawUpFunc   : function(canvasNode,event) {
                canvasNode.context.lineTo(event.layerX, event.layerY);
                canvasNode.context.closePath();
                canvasNode.drawBorder();
            },
            options  : {
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
        });
    }
);
document.querySelector("button[id*='polygon']").addEventListener('click',
    (event) => {
        selectTool({
            name     : 'polygon',
            label    : 'Polygon',
            cursor   : 'crosshair',
            eventsActive : true,
            drawDownFunc : function(canvasNode,event) {
                canvasNode.context.beginPath();
                canvasNode.context.moveTo(event.layerX, event.layerY);
            },
            drawMoveFunc : () => {},
            drawUpFunc   : function(canvasNode,event) {
                canvasNode.context.lineTo(event.layerX, event.layerY);
                canvasNode.context.closePath();
                canvasNode.drawBorder();
            },
            options  : {
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
        });
    }
);
document.querySelector("button[id*='square']").addEventListener('click',
    (event) => {
        selectTool({
            name     : 'square',
            label    : 'Square',
            cursor   : 'crosshair',
            eventsActive : true,
            drawDownFunc : function(canvasNode,event) {
                canvasNode.context.beginPath();
                canvasNode.positionBuffer.x = event.layerX;
                canvasNode.positionBuffer.y = event.layerY;
            },
            drawMoveFunc : () => {},
            drawUpFunc   : function(canvasNode,event) {
                canvasNode.context.rect(
                    canvasNode.positionBuffer.x,
                    canvasNode.positionBuffer.y,
                    event.layerX-canvasNode.positionBuffer.x,
                    event.layerY-canvasNode.positionBuffer.y,
                );
                canvasNode.drawBorder();
                canvasNode.context.fillStyle = this.options['bkgColor'].value;
                canvasNode.context.fill();
                canvasNode.context.closePath();
            },
            options  : {
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
        });
    }
);
document.querySelector("button[id*='elipse']").addEventListener('click',
    (event) => {
        selectTool({
            name     : 'elipse',
            label    : 'Elipse',
            cursor   : 'crosshair',
            eventsActive : true,
            drawDownFunc : function(canvasNode,event) {
                canvasNode.context.beginPath();
                canvasNode.positionBuffer.x = event.layerX;
                canvasNode.positionBuffer.y = event.layerY;
            },
            drawMoveFunc : () => {},
            drawUpFunc   : function(canvasNode,event) {
                canvasNode.context.ellipse(
                    canvasNode.positionBuffer.x,
                    canvasNode.positionBuffer.y,
                    event.layerX-canvasNode.positionBuffer.x,
                    event.layerY-canvasNode.positionBuffer.y,
                    Math.PI, 0, 2*Math.PI
                );
                canvasNode.drawBorder();
                canvasNode.context.fillStyle = this.options['bkgColor'].value;
                canvasNode.context.fill();
                canvasNode.context.closePath();
            },
            options  : {
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
                ratio : {
                    label : '1:1 ratio',
                    value : false,
                    type : 'checkbox'
                }
            }
        });
    }
);
document.querySelector("button[id*='text']").addEventListener('click',
    (event) => {
        selectTool({
            name     : 'text',
            label    : 'Text',
            cursor   : 'text',
            eventsActive : true,
            drawDownFunc : function() {},
            drawMoveFunc : function() {},
            drawUpFunc   : function (canvasNode,event) {
                canvasNode.context.font = `
                    ${canvasNode.selectedTool.options['fontSize'].value}px 
                    ${canvasNode.selectedTool.options['fontFamily'].value}
                `;
                canvasNode.context.textAlign = 'center';
                canvasNode.context.fillText(
                    this.options['contentText'].value,
                    event.layerX,
                    event.layerY + 10
                );
                canvasNode.context.fillStyle = this.options['bkgColor'].value;
                canvasNode.context.fill();
                canvasNode.context.closePath();
            },
            options  : {
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
        });
    }
);

/* Title Color Change ======================================================= */

let hue = 160;
let title = document.querySelector('.title').style;
let titleAnimationId = setInterval( () => {
    hue = hue<360 ? hue+4 : 0;
    title.backgroundImage =
        `linear-gradient(45deg, hsl(${hue},80%,70%), hsl(${hue+100},80%,70%))`;
    titleAnimationId == 0 ? clearInterval(1) : false;
},999);

/* Service Workers ========================================================== */

if ("serviceWorker" in navigator && false) {
    navigator.serviceWorker.register("sw.js").then( (registration) => {
        console.log("SW registred.",registration)
    }).catch( (error) => {
        console.log(error);
    });
}