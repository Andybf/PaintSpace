/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 29/mar/2021
 * Type: 
*/

import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class ChangeResolution extends AVElement{

    title;
    canvasRef;
    resizeRef;

    /* Constructors ========================================================= */
        
    constructor() {
        super();
        this.title = 'Change Resolution';
    }

    connectedCallback() { // After Comp Load
    }

    renderedCallback() {
        this.canvasRef = this.getParentComponents()[1].body.querySelector("comp-canvas");
        this.resizeRef = this.canvasRef.body.querySelector("comp-resize");
        this.body.querySelector("button[id='cr-change-resolution']").onclick = () => {
            this.resizeCanvas();
        }
        this.showCanvasDimensions();
    }

    /* Class Methods ======================================================== */

    showCanvasDimensions() {
        this.body.querySelector("input[id=input-width]").value = this.canvasRef.context.canvas.width;
        this.body.querySelector("input[id=input-height]").value = this.canvasRef.context.canvas.height;
    }

    resizeCanvas() {
        this.canvasRef.width = this.body.querySelector("input[id=input-width]").value;
        this.canvasRef.height = this.body.querySelector("input[id=input-height]").value;
        this.canvasRef.constructDrawScreen();
        this.resizeRef.updateResizeBarPositions();
        this.resizeRef.updateResizeBarDimensions();
    }

}