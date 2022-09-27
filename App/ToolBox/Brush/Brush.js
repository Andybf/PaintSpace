import AVElement from "/PaintSpace/AVmodules/AVElement.js";

export default class Brush extends AVElement {

    name = 'brush';
    label = 'Brush';
    cursor = 'crosshair';
    options = {
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

    renderedCallback(){
        this.body.addEventListener('click', (event) => {
            this.toolOptions = this.getParentComponent('app').getChildComponent("tool-options");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = this.getParentComponent('app').getChildComponent("canvas");
            this.canvas.activateObject(this);
        });
    }

    drawDown(compCanvas,event) {
        compCanvas.context.beginPath();
        compCanvas.context.arc(
            event.layerX, event.layerY,
            this.options['border'].value/2, 0, 2 * Math.PI
        );
        compCanvas.context.fillStyle = this.options['brdColor'].value;
        compCanvas.context.fill();
        compCanvas.context.closePath();
        compCanvas.context.beginPath();
    }
    
    drawMove(compCanvas,event) {
        compCanvas.context.lineTo(event.layerX, event.layerY);
        compCanvas.drawBorder();
    }

    drawUp(compCanvas,event) {
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
    }

    previewMove(preview,event){
        if (!preview.drag) {
            preview.cleanPreviewDrawnings();
            this.drawUp(preview,event);
        }
    }

    previewUp(self,event) {
    }
    
}