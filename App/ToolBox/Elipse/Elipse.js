import AVElement from "/PaintSpace/AVmodules/AVElement.js";

export default class Elipse extends AVElement{

    name     = 'elipse';
    label    = 'Elipse';
    cursor   = 'crosshair';
    eventsActive = true;
    options  = {
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

    renderedCallback(){
        this.body.addEventListener('click', (event) => {
            this.toolOptions = this.getParentComponent('app').getChildComponent("tool-options");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = this.getParentComponents('app').getChildComponent("canvas");
            this.canvas.activateObject(this);
        });
    }

    drawDown(canvasNode,event) {
        canvasNode.context.beginPath();
        canvasNode.positionBuffer.x = event.layerX;
        canvasNode.positionBuffer.y = event.layerY;
    }

    drawMove(){}

    drawUp(canvasNode,event) {
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
    }
}