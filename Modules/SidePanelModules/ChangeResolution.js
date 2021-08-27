/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 29/mar/2021
 * Type: 
*/

export default class ChangeResolution extends HTMLElement{

    /* Attributes =========================================================== */

    title;
    canvasRef;
    resizeRef;

    /* Constructors ========================================================= */
        
    constructor() {
        super();
        this.title = 'Change Resolution';
        this.innerHTML = `
            <li class='line'>
                <label class='cr-item-label'>Width</label>
                <input class='cr-item-input' id="input-width" type='number'/>
            </li>
            <li class='line'>
                <label class='cr-item-label'>Height</label>
                <input class='cr-item-input' id="input-height" type='number'/>
            </li>
            <button id="cr-change-resolution" class="cr-button">Apply</button>
        `;
    }

    connectedCallback() { // After Comp Load
    }

    init(canvasReference,resizeReference) {
        this.canvasRef = canvasReference;
        this.resizeRef = resizeReference;
        this.querySelector("button[id='cr-change-resolution']").onclick = () => {
            this.resizeCanvas();
        }
    }

    /* Class Methods ======================================================== */

    showCanvasDimensions() {
        this.querySelector("input[id=input-width]").value = this.canvasRef.context.canvas.width;
        this.querySelector("input[id=input-height]").value = this.canvasRef.context.canvas.height;
    }

    resizeCanvas() {
        this.canvasRef.width = this.querySelector("input[id=input-width]").value;
        this.canvasRef.height = this.querySelector("input[id=input-height]").value;
        this.canvasRef.constructDrawScreen();
        this.resizeRef.updateResizeBarPositions();
        this.resizeRef.updateResizeBarDimensions();
    }

}