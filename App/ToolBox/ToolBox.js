/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 30/ago/2021
*/

import AVElement from "/AVmodules/AVElement.js";
export default class ToolBox extends AVElement {

    language;
    localization = {
        title : {
            'en-US' : [
                { key : 'pointer', value : 'Pointer' },
                { key : 'brush', value : 'Brush' },
                { key : 'pencil', value : 'Pencil' },
                { key : 'line', value : 'Line' },
                { key : 'square', value : 'Rect' },
                { key : 'elipse', value : 'Elipses' },
                { key : 'polygon', value : 'Triangles' },
                { key : 'text', value : 'Text' },
            ],
            'pt-BR' : [
                { key : 'pointer', value : 'Ponteiro' },
                { key : 'brush', value : 'Pincel' },
                { key : 'pencil', value : 'Lápis' },
                { key : 'line', value : 'Linha' },
                { key : 'square', value : 'Retângulos' },
                { key : 'elipse', value : 'Elipses' },
                { key : 'polygon', value : 'Triângulos' },
                { key : 'text', value : 'Texto' },
            ]
        },
        tool : {
            'en-US' : {
                pointer : 'Pointer',
                brush : 'Brush',
                pencil : 'Pencil',
                line : 'Line',
                polygon : 'Polygon',
                square : 'Square',
                elipse : 'Elipse',
                text : 'Text',
            },
            'pt-BR' : {
                pointer : 'Ponteiro',
                brush : 'Pincel',
                pencil : 'Lápis',
                line : 'Linha',
                polygon : 'Poligono',
                square : 'Quadrado',
                elipse : 'Elipse',
                text : 'Texto',
            },
        }
    };

    constructor() {
        super();
        this.language = navigator.language;
    }

    renderedCallback() {
        this.body.querySelector("button[id='pointer']").addEventListener('click',
            (event) => {
                this.selectTool({
                    name     : 'pointer',
                    label    : this.localization['tool'][this.language]['pointer'],
                    cursor   : 'default',
                    drawDownFunc : function() {},
                    drawMoveFunc : function() {},
                    drawUpFunc   : function() {},
                    options  : {}
                });
            }
        );
        this.body.querySelector("button[id='brush']").addEventListener('click',
            (event) => {
                this.selectTool({
                    name         : 'brush',
                    label        : this.localization['tool'][this.language]['brush'],
                    cursor       : 'crosshair',
                    eventsActive : true,
                    drawDownFunc : function(compCanvas,event) {
                        compCanvas.context.beginPath();
                        compCanvas.context.arc(
                            event.layerX, event.layerY,
                            this.options['border'].value/2, 0, 2 * Math.PI
                        );
                        compCanvas.context.fillStyle = this.options['brdColor'].value;
                        compCanvas.context.fill();
                        compCanvas.context.closePath();
                        compCanvas.context.beginPath();
                    },
                    drawMoveFunc : function(compCanvas,event) {
                        compCanvas.context.lineTo(event.layerX, event.layerY);
                        compCanvas.drawBorder();
                    },
                    drawUpFunc   : function(compCanvas,event) {
                        compCanvas.context.closePath();
                        compCanvas.context.beginPath();
                        compCanvas.context.arc(
                            event.layerX, event.layerY,
                            this.options['border'].value/2, 0, 2 * Math.PI
                        );
                        compCanvas.context.fillStyle = this.options['brdColor'].value;
                        compCanvas.context.fill();
                        compCanvas.context.closePath();
                        compCanvas.context.beginPath();
                        compCanvas.context.lineTo(event.layerX, event.layerY);
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
        this.body.querySelector("button[id='pencil']").addEventListener('click',
            (event) => {
                this.selectTool({
                    name     : 'pencil',
                    label    : this.localization['tool'][this.language]['pencil'],
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
        this.body.querySelector("button[id*='line']").addEventListener('click',
            (event) => {
                this.selectTool({
                    name     : 'line',
                    label    : this.localization['tool'][this.language]['line'],
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
        this.body.querySelector("button[id*='polygon']").addEventListener('click',
            (event) => {
                this.selectTool({
                    name     : 'polygon',
                    label    : this.localization['tool'][this.language]['polygon'],
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
        this.body.querySelector("button[id*='square']").addEventListener('click',
            (event) => {
                this.selectTool({
                    name     : 'square',
                    label    : this.localization['tool'][this.language]['square'],
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
        this.body.querySelector("button[id*='elipse']").addEventListener('click',
            (event) => {
                this.selectTool({
                    name     : 'elipse',
                    label    : this.localization['tool'][this.language]['elipse'],
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
        this.body.querySelector("button[id*='text']").addEventListener('click',
            (event) => {
                this.selectTool({
                    name     : 'text',
                    label    : this.localization['tool'][this.language]['text'],
                    cursor   : 'text',
                    eventsActive : true,
                    drawDownFunc : function(canvasNode,event) {
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
                    drawMoveFunc : function() {},
                    drawUpFunc   : function () {},
                    options  : {
                        contentText : {
                            label : 'Content',
                            value : 'test',
                            type : 'text'
                        },
                        bkgColor : {
                            label : 'Bkg Color',
                            value : '#333',
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
    }

    selectTool(tool) {
        this.toolOptions = this.getParentComponents()[0].body.querySelector("comp-tooloptions");
        this.toolOptions.deactivateCurrentTool();
        this.toolOptions.show(tool);
        this.canvas = this.getParentComponents()[0].body.querySelector("comp-canvas");
        this.canvas.activateObject(tool);
    }
}