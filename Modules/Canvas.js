/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 30/jan/2021
 * Type: Experimental Software
*/

export default class Canvas extends HTMLElement {

    /* Attributes =========================================================== */

    selectedTool = {
        name     : '',
        bkgColor : '#',
        border   : 0,
        brdColor : '#',
        rotation : 0,
        size     : 0
    };

    /* Constructors ========================================================= */
    
    constructor() { // When Comp Is Created;
        super();
        this.self = this;
        this.innerHTML = `<canvas class="canvas" id="canvas"></canvas>`;
    }

    connectedCallback() { // After Comp Load
        this.element = this.querySelector("canvas");
        this.element.style['cursor'] = 'crosshair';
        this.context = this.element.getContext("2d");
        this.width = 600;
        this.height = 480;
        this.resizeDrawScreen();
        this.element.addEventListener('click',(event) => {
            this.draw(event);
        });
        console.log("[INFO] Canvas Initialized.");
    }

    /* Class Methods ======================================================== */

    resizeDrawScreen() {
        this.context.canvas.width = this.width;
        this.context.canvas.height = this.height;
        this.context.fillStyle = "#333";
        this.context.fillRect(0,0, this.width, this.height);
    }

    clearScreen() {
        this.context.clearRect(0,0, this.element.width, this.element.height);
        this.context.fillStyle = "white";
        this.context.fillRect(0,0, this.element.width, this.element.height);
    }

    activateObject(tool) {
        console.log(tool);
        this.selectedTool = tool;
    }
    
    zoom() {
        this.context.scale(2,2)
    }

    /* Draw Things Methods ================================================== */

    draw(event) {
        this.context.beginPath();
        switch (this.selectedTool.name) {
            case 'circle' :
                this.context.beginPath();
                this.context.arc(
                    event.layerX, event.layerY,
                    this.selectedTool.size, 0, 2*Math.PI
                );
                break;
            case 'square' :
                this.context.rect(
                    event.layerX - this.selectedTool.size/2,
                    event.layerY - this.selectedTool.size/2,
                    this.selectedTool.size, this.selectedTool.size);
                break;
            case 'text' :
                this.context.font = '30px Comic Sans MS';
                this.context.textAlign = 'center';
                this.context.fillText(
                    "text",
                    event.layerX,
                    event.layerY + 10
                );
                break;
            default :
                console.warn("[INFO] No tool was selected");
        }
        this.context.fillStyle = this.selectedTool.bkgColor;
        this.context.fill();
        if (this.selectedTool.border > 0) {
            this.context.lineWidth = this.selectedTool.border;
            this.context.stroke();
        }
        this.context.closePath();
    }
}