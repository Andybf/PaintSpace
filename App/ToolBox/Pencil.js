export default class Pencil extends HTMLElement {

    name     = 'pencil';
    label    = 'Pencil';
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
            <button class="tool-item" id="pencil" title="">
                <img id="free-draw-img" src="/PaintSpace/media/image/pencil.svg"/>
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
    }
    drawMove(canvasNode,event) {
        canvasNode.context.lineTo(event.offsetX, event.offsetY);
        canvasNode.drawBorder();
    }
    drawUp() {}
}


