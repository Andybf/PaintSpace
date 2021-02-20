/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 30/jan/2021
 * Type: Illustrator - Image Editor
*/

export default class Canvas extends HTMLElement {

    /* Attributes =========================================================== */

    selectedTool;
    element;
    positionBuffer = {  x : 0 , y : 0 };
    drag = false;
    mousedown = false;
    defaultWidth = 600;
    defaultHeight = 480;

    /* Constructors ========================================================= */
    
    constructor() {
        super();
        this.self = this;
        this.innerHTML = `
        <section class="canvas-wrapper">
            <canvas class="canvas" id="canvas"></canvas>
            <div id='resize'></div>
        </section>
        `;
    }

    connectedCallback() {
        this.element = this.querySelector("canvas");
        this.resize = this.querySelector('#resize');
        this.context = this.element.getContext("2d");
        this.width = this.defaultWidth;
        this.height = this.defaultHeight;
        this.resizeDrawScreen();
        this.createActions();
        this.resizeX = self.resize.getBoundingClientRect().left;
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
        this.selectedTool = tool;
    }
    
    zoom() {
        this.context.scale(2,2)
    }

    /* Action Methods ======================================================= */

    createActions() {
        
        this.resize.addEventListener('mousedown', (event) => {
            let self = this;
            function mouseMove(event) {
                setTimeout( () => {
                    self.resize.style['left'] = event.clientX + 'px';
                },17); // 60 FPS
            }
            function mouseUp (event) {
                if (confirm("Confirm resize of the screen? All the modifications will be erased after resizing.")) {
                    self.width=self.defaultWidth+(event.clientX-self.resizeX)*2;
                    self.resizeDrawScreen();
                }
                window.removeEventListener('mousemove', mouseMove);
                window.removeEventListener('mouseup',   mouseUp);
            }
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup',   mouseUp);
        });
        

        // For Canvas ==========================================================
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
            case 'brush' :
                this.context.arc(
                    event.layerX, event.layerY,
                    this.selectedTool.options[0].value/2, 0, 2 * Math.PI
                );
                this.context.fillStyle = this.selectedTool.options[1].value;
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
                    this.selectedTool.options[0].value/2, 0, 2 * Math.PI
                );
                this.context.fillStyle = this.selectedTool.options[1].value;
                this.context.fill();
                this.context.closePath();
                this.context.beginPath();
                this.context.lineTo(event.layerX, event.layerY);
                
                return false;
            case 'pencil' :
                return false;
            case 'line' :
                this.context.lineTo(event.layerX, event.layerY);
                break;
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
            default:
                return false;
        }
        this.drawBorder();
        this.context.fillStyle = this.selectedTool.options[3].value;
        this.context.fill();
        this.context.closePath();
    }

    drawBorder() {
        if (this.selectedTool.options[0].value > 0) {
            this.context.lineWidth = this.selectedTool.options[0].value;
            this.context.strokeStyle = this.selectedTool.options[1].value;
            this.context.stroke();
        }
    }
}