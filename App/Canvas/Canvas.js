import AVElement from "/PaintSpace/AVmodules//AVElement.js"
export default class Canvas extends AVElement {

    selectedTool = new Object();
    canvasNode = new Object();
    positionBuffer = {  x : 0 , y : 0 };
    imageBuffer = new Image();
    drag = false;
    mousedown = false;
    dynamicBgdActive = false;
    default = {
        width : 600,
        height: 480,
        background: '#ccc'
    }

    renderedCallback() {
        this.canvasNode = this.body.querySelector("canvas");
        this.context = this.canvasNode.getContext("2d");
        this.width = this.default.width;
        this.height = this.default.height;
        this.constructDrawScreen();
        this.#createActions();
    }

    constructDrawScreen() {
        this.context.canvas.width = this.width;
        this.context.canvas.height = this.height;
        this.context.clearRect(0,0, this.width, this.height);
        this.paintScreen();
    }

    clearScreen() {
        this.context.clearRect(0,0, this.canvasNode.width, this.canvasNode.height);
        this.paintScreen();
    }

    paintScreen() {
        this.context.fillStyle = this.default.background;
        this.context.fillRect(0,0, this.canvasNode.width, this.canvasNode.height);
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
            if (this.selectedTool){
                this.previewMove(this.selectedTool,event);
                if (this.drag) {
                    this.selectedTool.drawMove(this,event);
                }
            }
        });
        this.canvasNode.addEventListener('mousedown', (event) => {
            if (Object.entries(this.selectedTool).length > 0) {
                this.drag = true;
                this.selectedTool.drawDown(this,event);
                this.mousedown = true;
            }
        });
        this.canvasNode.addEventListener('mouseup', (event) => {
            this.drag = false;
            this.mousedown = false;
            if (this.selectedTool){
                this.previewUp(this.selectedTool,event);
            }
        });
        this.canvasNode.addEventListener('mouseout', (event) => {
            this.drag = this.mousedown ? true : false;
        });
        this.canvasNode.addEventListener('mouseup', (event) => {
            if (Object.entries(this.selectedTool).length > 0) {
                this.mousedown = false;
                this.drag = false;
                this.selectedTool.drawUp(this,event);
            }
        });
        this.addEventListener('mouseup', (event) => {
            this.mousedown = false;
            this.drag = false;
        });
    }

    saveImageBuffer() {
        let img = new Image();
        img.src = this.canvasNode.toDataURL();
        this.imageBuffer = img;
    }
    
    loadImageBuffer() {
        this.context.drawImage(this.imageBuffer, 0, 0, this.imageBuffer.width, this.imageBuffer.height);
    }

    drawImageOnCanvas(image){
        this.context.drawImage( image, 0, 0, this.width, this.height );
    }

    drawBorder() {
        if (this.selectedTool.options['border'].value > 0) {
            this.context.lineWidth = this.selectedTool.options['border'].value;
            this.context.strokeStyle = this.selectedTool.options['brdColor'].value;
            this.context.stroke();
        }
    }

    drawDown(canvas,event) {}

    drawMove(canvas,event) {}

    drawUp(canvas,event) {}

    previewDown(selectedTool,event) {}

    previewMove(selectedTool,event) {}

    previewUp(selectedTool,event) {}
}