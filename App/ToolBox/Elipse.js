export default class Elipse extends HTMLElement {

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

    constructor() {
        super();
        this.innerHTML = `
            <button class="tool-item" id="elipse" title="Elipse">
                <img id="free-draw-img" src="/PaintSpace/media/image/circle.svg"/>
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
        canvasNode.positionBuffer.x = event.offsetX;
        canvasNode.positionBuffer.y = event.offsetY;
    }

    drawMove(){}

    drawUp(canvasNode,event) {
        let x = event.offsetX-this.canvas.positionBuffer.x;
        let y = event.offsetY-this.canvas.positionBuffer.y;
        x = (x < 0) ? -x : x;
        y = (y < 0) ? -y : y;
        y = (this.options['ratio'].value == true) ? x : y;
        canvasNode.context.ellipse(
            this.canvas.positionBuffer.x,
            this.canvas.positionBuffer.y,
            x,
            y,
            Math.PI,
            0,
            2*Math.PI
        );
        canvasNode.drawBorder();
        canvasNode.context.fillStyle = this.options['bkgColor'].value;
        canvasNode.context.fill();
        canvasNode.context.closePath();
    }

    previewDown(preview, event) {
        preview.selectedTool = this;
    }

    previewMove(preview, event) {
        if (this.canvas.drag) {
            preview.cleanPreviewDrawnings();
            this.drawUp(preview,event);
        }
    }

    previewUp(self, event) {
        self.cleanPreviewDrawnings();
    }
}