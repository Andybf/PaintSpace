import AVElement from "/PaintSpace/AVmodules/AVElement.js"
export default class Square extends AVElement {

    name     = 'square';
    label    = 'Square';
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
            this.toolOptions = this.getParentComponents()[1].body.querySelector("comp-tool-options");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = this.getParentComponents()[1].body.querySelector("comp-canvas");
            this.canvas.activateObject(this);
        });
    }

    drawDown(canvasNode,event) {
        canvasNode.context.beginPath();
        canvasNode.positionBuffer.x = event.layerX;
        canvasNode.positionBuffer.y = event.layerY;
    }

    drawMove() {}

    drawUp(canvasNode,event) {
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
    }
}