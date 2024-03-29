import AVElement from "/PaintSpace/AVmodules//AVElement.js"
export default class Canvas extends AVElement {

    selectedTool = new Object();
    context = new Object();
    canvasNode = new Object();
    positionBuffer = {  x : 0 , y : 0 };
    imageBuffer = new Image();
    drag = false;
    mousedown = false;
    dynamicBgdActive = false;
    default = {
        width : window.innerWidth/1.25,
        height: window.innerHeight/1.33,
        background: '#ddd'
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
        this.body.firstElementChild.style.transform =
            `translate(${((window.innerWidth-this.width)/2).toFixed(0)}px, ${((window.innerHeight-this.height)/2).toFixed(0)}px)`;
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

    calculateTouchCoordsFor(newEvent, oldEvent) {
        const canvasRect = this.canvasNode.getBoundingClientRect();
        newEvent.offsetX = oldEvent.changedTouches[0].pageX - canvasRect.x;
        newEvent.offsetY =  oldEvent.changedTouches[0].pageY - canvasRect.y;
        return newEvent;
    }

    #createActions() {
        this.canvasNode.addEventListener('touchmove', (event) => {
            event.preventDefault();
            this.canvasNode.dispatchEvent(this.calculateTouchCoordsFor(new Event('mousemove'),event));
        });
        this.canvasNode.addEventListener('mousemove', (event) => {
            if (this.selectedTool) {
                if (this.selectedTool.eventsActive) {
                    this.previewMove(this.selectedTool,event);
                    if (this.drag) {
                        this.selectedTool.drawMove(this,event);
                    }
                }
            }
        });
        this.canvasNode.addEventListener('touchstart', (event) => {
            this.canvasNode.dispatchEvent(this.calculateTouchCoordsFor(new Event('mousedown'),event));
        });
        this.canvasNode.addEventListener('mousedown', (event) => {
            if (Object.entries(this.selectedTool).length > 0) {
                if (this.selectedTool.eventsActive) {
                    this.previewDown(this.selectedTool, event);
                    this.drag = true;
                    this.selectedTool.drawDown(this,event);
                    this.mousedown = true;
                }
            }
        });
        this.canvasNode.addEventListener('touchend', (event) => {
            this.canvasNode.dispatchEvent(this.calculateTouchCoordsFor(new Event('mouseup'),event));
        });
        this.canvasNode.addEventListener('mouseup', (event) => {
            if (Object.entries(this.selectedTool).length > 0) {
                if (this.selectedTool.eventsActive) {
                    this.previewUp(this.selectedTool,event);
                    this.mousedown = false;
                    this.drag = false;
                    this.selectedTool.drawUp(this,event);
                }
            }
        });
        this.canvasNode.addEventListener('mouseout', (event) => {
            this.drag = this.mousedown ? true : false;
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