import AVElement from "/AVmodules/AVElement.js"
export default class Line extends AVElement {

    name     = 'line';
    label    = 'Line';
    cursor   = 'crosshair';
    eventsActive = true;
    options  = {
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
