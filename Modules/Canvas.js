/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 30/jan/2021
 * Type: Experimental Software
*/

export default class Canvas extends HTMLElement {

    /* Constructors ========================================================= */
    
    constructor() { // When Comp Is Created;
        super();
        this.self = this;
        this.innerHTML = `<canvas class="canvas" id="canvas"></canvas>`;
    }

    connectedCallback() { // After Comp Load
        this.element = this.querySelector("canvas");
        this.addEventListener('click',(event) => {
            this.drawCircle(event);
        });
        this.context = this.element.getContext("2d");
        //this.width = document.querySelector("comp-canvascontainer").clientWidth;
        //this.height = document.querySelector("comp-canvascontainer").clientHeight;
        this.width = 480;
        this.height = 320;
        this.resizeDrawScreen();
        console.log("[INFO] Canvas Initialized.");
    }

    /* Class Methods ======================================================== */

    resizeDrawScreen() {
        this.context.canvas.width = this.width;
        this.context.canvas.height = this.height;
        this.context.fillStyle = "#333";
        this.context.fillRect(0,0, this.width, this.height);
        //this.drawAxis();
    }

    clearScreen() {
        this.context.clearRect(0,0, this.element.width, this.element.height);
        this.context.fillStyle = "white";
        this.context.fillRect(0,0, this.element.width, this.element.height);
    }
    
    zoom() {
        this.context.scale(2,2)
    }

    /* Draw Things Methods ================================================== */

    drawCircle(event) {
        this.context.beginPath();
        this.context.arc(event.layerX, event.layerY, 10, 0, 2*Math.PI);
        this.context.fillStyle = "#0f0";
        this.context.fill();
        this.context.stroke();
    }
}