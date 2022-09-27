import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class ChangeResolution extends AVElement{

    title;
    canvasRef;
    resizeRef;

    connectedCallback() {
        this.title = 'Change Resolution';
    }

    renderedCallback() {
        this.canvasRef = this.getParentComponent('app').getChildComponent("canvas");
        this.resizeRef = this.canvasRef.body.querySelector("comp-resize");
        this.body.querySelector("button[id='cr-change-resolution']").onclick = () => {
            this.resizeCanvas();
        }
        this.showCanvasDimensions();
    }

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