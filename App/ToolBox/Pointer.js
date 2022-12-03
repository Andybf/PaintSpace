export default class Pointer extends HTMLElement {
    
    name = 'pointer';
    label = 'Pointer';
    cursor = 'grab';
    eventsActive = true;
    options = new Object();

    canvasTranslatePoint = {
        x : 0,
        y : 0
    }
    grabLimitPercent = 0.20;

    constructor() {
        super();
        this.innerHTML = `
            <button class="tool-item" id="pointer" title="Pointer">
                <img id="free-draw-img" src="/PaintSpace/media/image/move.svg"/>
            </button>
        `;
        this.initialize();
    }

    initialize() {
        this.firstElementChild.addEventListener('click', (event) => {
            this.toolOptions = document.querySelector('comp-app').getChildComponent("tool-options");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = document.querySelector('comp-app').getChildComponent("canvas");
            this.canvas.activateObject(this);
            this.canvasTranslatePoint = {
                x : ((window.innerWidth-this.canvas.width)/2).toFixed(0),
                y : ((window.innerHeight-this.canvas.height)/2).toFixed(0)
            }
        });
    }

    drawDown(canvasNode, event) {
        this.canvas.canvasNode.style.cursor = 'grabbing';
        this.canvas.positionBuffer.x = event.screenX - this.canvasTranslatePoint.x;
        this.canvas.positionBuffer.y = event.screenY - this.canvasTranslatePoint.y;
    }

    drawMove(canvasNode, event) {
        if (! canvasNode.mouseout) {
            const rect = this.canvas.canvasNode.getBoundingClientRect();

            if ((rect.x+rect.width) < window.innerWidth * this.grabLimitPercent) {
                this.canvasTranslatePoint.x = (window.innerWidth * this.grabLimitPercent)+1 - rect.width;
                canvasNode.drag = false;
            }
            else if ((rect.y+rect.height) < window.innerHeight * this.grabLimitPercent) {
                this.canvasTranslatePoint.y = (window.innerHeight * this.grabLimitPercent)+1 - rect.height;
                canvasNode.drag = false;
            }
            else if (rect.x > window.innerWidth * (1.0 - this.grabLimitPercent)) {
                this.canvasTranslatePoint.x = (window.innerWidth*(1.0-this.grabLimitPercent))-1;
                canvasNode.drag = false;
            }
            else if (rect.y > window.innerHeight * (1.0 - this.grabLimitPercent)) {
                this.canvasTranslatePoint.y = (window.innerHeight*(1.0-this.grabLimitPercent))-1;
                canvasNode.drag = false;
            } else {
                this.canvasTranslatePoint.x = (event.screenX - this.canvas.positionBuffer.x);
                this.canvasTranslatePoint.y = (event.screenY - this.canvas.positionBuffer.y);
            }

            canvasNode.body.firstElementChild.style.transform =
                `translate(${this.canvasTranslatePoint.x}px, ${this.canvasTranslatePoint.y}px)`;
        }
        
    }
    
    drawUp() {
        this.canvas.canvasNode.style.cursor = 'grab';
    }
}