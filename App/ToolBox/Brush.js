export default class Brush extends HTMLElement {

    name = 'brush';
    label = 'Brush';
    cursor = 'crosshair';
    eventsActive = true;
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

    constructor() {
        super();
        this.innerHTML = `
            <button class="tool-item" id="brush" title="">
                <img id="free-draw-img" src="/PaintSpace/media/image/brush.svg"/>
            </button>
        `;
        this.initialize();
    }

    initialize(){
        this.firstElementChild.addEventListener('click', (event) => {
            this.toolOptions = document.querySelector('comp-app').getChildComponent("tool-options");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = document.querySelector('comp-app').getChildComponent("canvas");
            this.canvas.activateObject(this);
        });
    }

    drawDown(compCanvas,event) {
        compCanvas.context.beginPath();
        compCanvas.context.arc(
            event.offsetX, event.offsetY,
            this.options['border'].value/2, 0, 2 * Math.PI
        );
        compCanvas.context.fillStyle = this.options['brdColor'].value;
        compCanvas.context.fill();
        compCanvas.context.closePath();
        compCanvas.context.beginPath();
    }
    
    drawMove(compCanvas,event) {
        compCanvas.context.lineTo(event.offsetX, event.offsetY);
        compCanvas.drawBorder();
    }

    drawUp(compCanvas,event) {
        compCanvas.context.closePath();
        compCanvas.context.beginPath();
        compCanvas.context.arc(
            event.offsetX, event.offsetY,
            this.options['border'].value/2, 0, 2 * Math.PI
        );
        compCanvas.context.fillStyle = this.options['brdColor'].value;
        compCanvas.context.fill();
        compCanvas.context.closePath();
        compCanvas.context.beginPath();
        compCanvas.context.lineTo(event.offsetX, event.offsetY);
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