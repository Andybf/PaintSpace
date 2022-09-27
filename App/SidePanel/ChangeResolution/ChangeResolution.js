import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class ChangeResolution extends AVElement {

    title;
    canvasRef;
    resizeRef;

    connectedCallback() {
        this.title = 'Change Resolution';
    }

    renderedCallback() {
        this.canvasRef = this.getParentComponent('app').getChildComponent("canvas");
        this.previewRef = this.canvasRef.getChildComponent('preview');
        this.resizeRef = this.canvasRef.body.querySelector("comp-resize");
        this.inputHeight = this.body.querySelector("input[id=input-height]");
        this.inputWidth = this.body.querySelector("input[id=input-width]");
        this.body.querySelector("button[id='cr-change-resolution']").onclick = () => {
            this.resizeCanvas();
            this.resizePreview();
        }
        this.showCanvasDimensions();
    }

    showCanvasDimensions() {
        this.inputWidth.value = this.canvasRef.context.canvas.width;
        this.inputHeight.value = this.canvasRef.context.canvas.height;
    }

    resizeCanvas() {
        this.canvasRef.width = Number(this.inputWidth.value);
        this.canvasRef.height = Number(this.inputHeight.value);
        this.canvasRef.constructDrawScreen();
        this.resizeRef.updateResizeBarDimensions();
    }

    resizePreview () {
        this.previewRef.width = Number(this.inputWidth.value);
        this.previewRef.height = Number(this.inputHeight.value);
    }

}