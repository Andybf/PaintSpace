export default class Polygon extends HTMLElement {

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
    constructor() {
        super();
        this.innerHTML = `
            <button class="tool-item" id="polygon" title="">
                <img id="free-draw-img" src="/PaintSpace/media/image/triangle.svg"/>
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
        canvasNode.context.moveTo(event.offsetX, event.offsetY);
    }

    drawMove() {}

    drawUp(canvasNode,event) {
        canvasNode.context.lineTo(event.offsetX, event.offsetY);
        canvasNode.context.closePath();
        canvasNode.drawBorder();
    }
}