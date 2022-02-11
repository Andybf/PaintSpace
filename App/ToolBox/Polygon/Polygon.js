import AVElement from "/PaintSpace/AVmodules/AVElement.js"
export default class Polygon extends AVElement {

    name     = 'polygon';
    label    = 'Polygon';
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
        }
    }

    renderedCallback(){
        this.body.addEventListener('click', (event) => {
            this.toolOptions = this.getParentComponents()[1].body.querySelector("comp-tooloptions");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = this.getParentComponents()[1].body.querySelector("comp-canvas");
            this.canvas.activateObject(this);
        });
    }

    drawDown(canvasNode,event) {
        canvasNode.context.beginPath();
        canvasNode.context.moveTo(event.layerX, event.layerY);
    }

    drawMove() {}

    drawUp(canvasNode,event) {
        canvasNode.context.lineTo(event.layerX, event.layerY);
        canvasNode.context.closePath();
        canvasNode.drawBorder();
    }
}