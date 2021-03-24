/*
 * PaintSpace3
 *  Created By: Anderson Bucchianico
 *        Date: 30/jan/2021
 * Description: Canvas module, the core of the graphics logic.
*/

export default class Canvas extends HTMLElement {

    /* Attributes =========================================================== */

    selectedTool;
    canvasNode;
    positionBuffer = {  x : 0 , y : 0 };
    drag = false;
    mousedown = false;
    default = {
        width : 600,
        height: 480,
        background: '#ccc'
    }

    /* Constructors ========================================================= */
    
    constructor() {
        super();
        this.innerHTML = `
        <section class="canvas-wrapper">
            <canvas class="canvas" id="canvas"></canvas>
            <comp-resize></comp-resize>
        </section>
        `;
    }

    connectedCallback() {
        this.canvasNode = this.querySelector("canvas");
        this.context = this.canvasNode.getContext("2d");
        this.width = this.default.width;
        this.height = this.default.height;
        this.constructDrawScreen();
        this.createActions();
    }

    /* Class Methods ======================================================== */

    constructDrawScreen() {
        this.context.canvas.width = this.width;
        this.context.canvas.height = this.height;
        this.context.fillStyle = this.default.background;
        this.context.fillRect(0,0, this.width, this.height);
    }

    clearScreen() {
        this.context.clearRect(0,0, this.canvasNode.width, this.canvasNode.height);
        this.context.fillStyle = this.default.background;
        this.context.fillRect(0,0, this.canvasNode.width, this.canvasNode.height);
    }

    activateObject(tool) {
        this.selectedTool = tool;
    }
    
    zoom() {
        this.context.scale(2,2)
    }

    createActions() {
        this.canvasNode.addEventListener('mousemove', (event) => {
            if (this.drag) {
                this.drawMove(event);
            }
        });
        this.canvasNode.addEventListener('mousedown', (event) => {
            this.drag = true;
            this.drawDown(event);
            this.mousedown = true;
        });
        this.canvasNode.addEventListener('mouseup', (event) => {
            this.drag = false;
            this.mousedown = false;
        });
        this.canvasNode.addEventListener('mouseout', (event) => {
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
        if (!this.selectedTool) {
            return false;
        }
        this.context.beginPath();
        switch (this.selectedTool.name) {
            case 'brush' :
                this.context.arc(
                    event.layerX, event.layerY,
                    this.selectedTool.options['border'].value/2, 0, 2 * Math.PI
                );
                this.context.fillStyle = this.selectedTool.options['brdColor'].value;
                this.context.fill();
                this.context.closePath();
                this.context.beginPath();
                break;
            case 'pencil' :
                return false;
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
        if (!this.selectedTool) {
            return false;
        }
        switch (this.selectedTool.name) {
            case 'brush' :
                this.context.lineTo(event.layerX, event.layerY);
                break;
            case 'pencil' :
                this.context.lineTo(event.layerX, event.layerY);
                break;
            case 'line' :
                return false;
            case 'circle' :
                return false;
            case 'square' :
                return false;
            case 'text' :
                return false;
            default:
                return false;
        }
        this.drawBorder();
    }

    drawUp(event) {
        if (!this.selectedTool) {
            return false;
        }
        switch (this.selectedTool.name) {
            case 'brush' :
                console.log(this.selectedTool)
                this.context.closePath();
                this.context.beginPath();
                this.context.arc(
                    event.layerX, event.layerY,
                    this.selectedTool.options['border'].value/2, 0, 2 * Math.PI
                );
                this.context.fillStyle = this.selectedTool.options['brdColor'].value;
                this.context.fill();
                this.context.closePath();
                this.context.beginPath();
                this.context.lineTo(event.layerX, event.layerY);
                
                return false;
            case 'pencil' :
                return false;
            case 'line' :
                this.context.lineTo(event.layerX, event.layerY);
                this.context.closePath();
                this.drawBorder();
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
                this.context.font = `
                    ${this.selectedTool.options['fontSize'].value}px 
                    ${this.selectedTool.options['fontFamily'].value}
                `;
                this.context.textAlign = 'center';
                this.context.fillText(
                    this.selectedTool.options['contentText'].value,
                    event.layerX,
                    event.layerY + 10
                );
                this.context.fillStyle = this.selectedTool.options['bkgColor'].value;
                this.context.fill();
                this.context.closePath();
                return false;
            default:
                return false;
        }
        this.drawBorder();
        this.context.fillStyle = this.selectedTool.options['bkgColor'].value;
        this.context.fill();
        this.context.closePath();
    }

    drawBorder() {
        if (this.selectedTool.options['border'].value > 0) {
            this.context.lineWidth = this.selectedTool.options['border'].value;
            this.context.strokeStyle = this.selectedTool.options['brdColor'].value;
            this.context.stroke();
        }
    }
}