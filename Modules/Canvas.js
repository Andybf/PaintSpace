/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 30/jan/2021
 * Type: Illustrator - Image Editor
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
    positionBuffer = {  x : 0 , y : 0 };
    drag = false;
    mousedown = false;

    /* Constructors ========================================================= */
    
    constructor() {
        super();
        this.self = this;
        this.innerHTML = `<canvas class="canvas" id="canvas"></canvas>`;
    }

    connectedCallback() {
        this.element = this.querySelector("canvas");
        this.element.style['cursor'] = 'crosshair';
        this.context = this.element.getContext("2d");
        this.width = 600;
        this.height = 480;
        this.resizeDrawScreen();
        this.createActions();
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

    /* Action Methods ======================================================= */

    createActions() {
        this.element.addEventListener('mousemove', (event) => {
            if (this.drag) {
                this.drawMove(event);
            }
        });
        this.element.addEventListener('mousedown', (event) => {
            this.drag = true;
            this.drawDown(event);
            this.mousedown = true;
        });
        this.element.addEventListener('mouseup', (event) => {
            this.drag = false;
            this.mousedown = false;
        });
        this.element.addEventListener('mouseout', (event) => {
            if (this.mousedown) {
                this.drag = true;
            } else {
                this.drag = false;
            }
        });
        this.addEventListener('mouseup', (event) => {
            this.mousedown = false;
            this.drag = false;
            this.drawUp(event);
        });
    }

    /* Draw Things Methods ================================================== */

    drawDown(event) {
        this.context.beginPath();
        switch (this.selectedTool.name) {
            case 'line' :
                this.context.moveTo(event.layerX, event.layerY);
                break;
            case 'circle' :
                this.positionBuffer.x = event.layerX;
                this.positionBuffer.y = event.layerY;
                break;
            case 'square' :
                this.positionBuffer.x = event.layerX;
                this.positionBuffer.y = event.layerY;
                break;
            case 'text' :
                return false;
        }
    }

    drawMove(event) {
        switch (this.selectedTool.name) {
            case 'line' :
                this.context.lineTo(event.layerX, event.layerY);
                break;
            case 'circle' :
                return false;
            case 'square' :
                return false;
            case 'text' :
                return false;
        }
        this.drawBorder();
    }

    drawUp(event) {
        console.log('drawup',this.selectedTool.name);
        console.log('buffer',this.positionBuffer.x, this.positionBuffer.y);
        console.log('newpos',event.layerX, event.layerY);
        switch (this.selectedTool.name) {
            case 'free-draw' :
                return false;
            case 'line' :
                return false;
            case 'circle' :
                this.context.ellipse(
                    this.positionBuffer.x,
                    this.positionBuffer.y,
                    event.layerX-this.positionBuffer.x,
                    event.layerY-this.positionBuffer.y,
                    Math.PI, 0, 2*Math.PI
                );
                break;
            case 'square' :
                this.context.rect(
                    this.positionBuffer.x,
                    this.positionBuffer.y,
                    event.layerX-this.positionBuffer.x,
                    event.layerY-this.positionBuffer.y,
                );
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
        }
        this.drawBorder();
        this.context.fillStyle = this.selectedTool.bkgColor;
        this.context.fill();
        this.context.closePath();
    }

    drawBorder(){
        if (this.selectedTool.border > 0) {
            this.context.lineWidth = this.selectedTool.border;
            this.context.strokeStyle = this.selectedTool.brdColor;
            this.context.stroke();
        }
    }
}