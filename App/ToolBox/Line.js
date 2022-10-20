export default class Line extends HTMLElement {

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

    constructor() {
        super();
        this.innerHTML = `
            <button class="tool-item" id="line" title="Line">
                <img id="free-draw-img" src="/PaintSpace/media/image/line.svg"/>
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

    drawDown(canvasNode,event) {
        canvasNode.context.beginPath();
        this.canvas.positionBuffer.x = event.offsetX;
        this.canvas.positionBuffer.y = event.offsetY;
        canvasNode.context.moveTo(event.offsetX, event.offsetY);
    }

    drawMove() {}

    drawUp(canvasNode,event) {
        canvasNode.context.lineTo(event.offsetX, event.offsetY);
        canvasNode.context.closePath();
        canvasNode.drawBorder();
    }

    previewDown(preview, event) {
        preview.selectedTool = this;
    }

    previewMove(preview,event){
        if (this.canvas.drag) {
            preview.cleanPreviewDrawnings();
            preview.context.beginPath();
            preview.context.moveTo(
                this.canvas.positionBuffer.x,
                this.canvas.positionBuffer.y
            );
            this.drawUp(preview, event);
        }
    }

    previewUp(self,event) {
        self.cleanPreviewDrawnings();
    }
}