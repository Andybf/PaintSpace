export default class Square extends HTMLElement {

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

    constructor() {
        super();
        this.innerHTML = `
            <button class="tool-item" id="square" title="">
                <img id="free-draw-img" src="/PaintSpace/media/image/square.svg"/>
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

    drawMove() {}

    drawUp(canvasNode,event) {
        canvasNode.context.rect(
            canvasNode.positionBuffer.x,
            canvasNode.positionBuffer.y,
            event.offsetX-canvasNode.positionBuffer.x,
            event.offsetY-canvasNode.positionBuffer.y,
        );
        canvasNode.drawBorder();
        canvasNode.context.fillStyle = this.options['bkgColor'].value;
        canvasNode.context.fill();
        canvasNode.context.closePath();
    }
}