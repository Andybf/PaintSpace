export default class Pointer extends HTMLElement {
    
    name = 'pointer';
    label = 'Pointer';
    cursor = 'default';
    eventsActive = true;
    options = new Object();

    constructor() {
        super();
        this.innerHTML = `
            <button class="tool-item" id="pointer" title="">
                <img id="free-draw-img" src="/PaintSpace/media/image/pointer.svg"/>
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
        this.firstElementChild.dispatchEvent(new Event('click'));
    }

    drawDown() {}
    drawMove() {}
    drawUp() {}
}