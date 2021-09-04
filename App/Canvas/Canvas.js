/*
 * PaintSpace3
 *  Created By: Anderson Bucchianico
 *        Date: 30/jan/2021
 * Description: Canvas module, the core of the graphics logic.
*/

import AVElement from "/AVmodules//AVElement.js"
export default class Canvas extends AVElement {

    selectedTool;
    canvasNode;
    positionBuffer = {  x : 0 , y : 0 };
    imageBuffer;
    drag = false;
    mousedown = false;
    dynamicBgdActive = false;
    default = {
        width : 600,
        height: 480,
        background: '#ccc'
    }

    /* Constructors ========================================================= */
    
    constructor() {
        super();
    }

    renderedCallback() {
        this.canvasNode = this.body.querySelector("canvas");
        this.overlay = this.body.querySelector("#tool-preview-overlay");
        this.context = this.canvasNode.getContext("2d");
        this.width = this.default.width;
        this.height = this.default.height;
        this.constructDrawScreen();
        this.#createActions();
    }

    /* Class Methods ======================================================== */

    constructDrawScreen() {
        this.context.canvas.width = this.width;
        this.context.canvas.height = this.height;
        this.context.fillStyle = this.default.background;
        this.context.fillRect(0,0, this.width, this.height);
        this.updateBackground();
    }

    clearScreen() {
        this.context.clearRect(0,0, this.canvasNode.width, this.canvasNode.height);
        this.context.fillStyle = this.default.background;
        this.context.fillRect(0,0, this.canvasNode.width, this.canvasNode.height);
        this.updateBackground();
    }

    activateObject(tool) {
        this.selectedTool = tool;
        this.#changeCanvasCursor(tool.cursor);
    }

    #changeCanvasCursor(newCursor){
        this.canvasNode.style['cursor'] = newCursor;
    }

    #createActions() {
        this.canvasNode.addEventListener('mousemove', (event) => {
            if (this.drag && this.selectedTool) {
                this.drawMove(event);
            }
        });
        this.canvasNode.addEventListener('mousedown', (event) => {
            this.drag = true;
            if (this.selectedTool) {
                this.drawDown(event);
            }
            this.mousedown = true;
        });
        this.canvasNode.addEventListener('mouseup', (event) => {
            this.drag = false;
            this.mousedown = false;
        });
        this.canvasNode.addEventListener('mouseout', (event) => {
            this.drag = this.mousedown ? true : false;
        });
        this.canvasNode.addEventListener('mouseup', (event) => {
            this.mousedown = false;
            this.drag = false;
            if (this.selectedTool) {
                this.drawUp(event);
            }
        });
        this.addEventListener('mouseup', (event) => {
            this.mousedown = false;
            this.drag = false;
        });
    }

    updateBackground() {
        this.dynamicBgdActive ?
            document.querySelector('body').style.backgroundImage =
                `url(${this.canvasNode.toDataURL("image/png")}`:
            document.querySelector('body').style.backgroundImage =
                "linear-gradient(transparent, transparent)";
    }

    saveImageBuffer() {
        let img = new Image();
        img.src = this.canvasNode.toDataURL();
        this.imageBuffer = img;
    }
    
    loadImageBuffer() {
        this.context.drawImage(
            this.imageBuffer,
            0, 0,
            this.imageBuffer.width, this.imageBuffer.height
        );
        this.updateBackground();
    }

    /* Draw Things Methods ================================================== */

    drawDown(event) {
        this.selectedTool.eventsActive ?
            this.selectedTool.drawDownFunc(this,event) :
            false
        ;
    }

    drawMove(event) {
        this.selectedTool.eventsActive ?
            this.selectedTool.drawMoveFunc(this,event) :
            false
        ;
        this.updateBackground();
    }

    drawUp(event) {
        this.selectedTool.eventsActive ?
            this.selectedTool.drawUpFunc(this,event) :
            false
        ;
        this.updateBackground();
    }

    drawBorder() {
        if (this.selectedTool.options['border'].value > 0) {
            this.context.lineWidth = this.selectedTool.options['border'].value;
            this.context.strokeStyle = this.selectedTool.options['brdColor'].value;
            this.context.stroke();
        }
    }
}