import AVElement from "/PaintSpace/AVmodules/AVElement.js";
export default class Resize extends AVElement {

    canvasComponent;
    previewComponent;
    verticalResizeNode;
    horizontalResizeNode;
    resolutionViewer;
    confirmMessage;

    renderedCallback() {
        this.initialize();
    }

    initialize() {
        this.canvasComponent = this.getParentComponent('canvas');
        this.previewComponent = this.canvasComponent.getChildComponent('preview');
        this.verticalResizeNode = this.body.querySelector('#resize-width');
        this.horizontalResizeNode = this.body.querySelector('#resize-height');
        this.resolutionViewer = this.body.querySelector('#resolution-viewer');
        this.updateResizeBarDimensions();
        this.addVerticalBarEventListener(this.verticalResizeNode, 'width', 'left', 'clientX');
        this.addVerticalBarEventListener(this.horizontalResizeNode, 'height', 'top', 'clientY');
    }

    updateResizeBarDimensions() {
        this.verticalResizeNode.style['height'] = this.canvasComponent.canvasNode.height +'px';
        this.horizontalResizeNode.style['width'] = this.canvasComponent.canvasNode.width +'px';
    }

    addVerticalBarEventListener(resizeBar, dimension, moveDirection, client) {
        resizeBar.addEventListener('mousedown', (event) => {
            this.resolutionViewer.style.display = 'unset';
            resizeBar.style.background = 'grey';
            this.canvasComponent.saveImageBuffer();

            window.onmousemove = (event) => {
                resizeBar.style[moveDirection] = this.canvasComponent[dimension] + (this.calcAddedPixelsToCanvas(event[client],moveDirection,dimension)/2) + 'px';
                this.resolutionViewer.innerHTML =
                    (this.canvasComponent.width + this.calcAddedPixelsToCanvas(event[client],moveDirection,dimension)).toFixed(0) + 'x' +
                    this.canvasComponent.canvasNode.height;
            };
            window.onmouseup = (event) => {
                resizeBar.style.background = null;
                resizeBar.style[moveDirection] = null;
                let newSize = this.canvasComponent[dimension] +
                              this.calcAddedPixelsToCanvas(event[client],moveDirection,dimension);
                this.canvasComponent[dimension] = newSize;
                this.previewComponent[dimension] = newSize;
                this.canvasComponent.constructDrawScreen();
                this.canvasComponent.loadImageBuffer();
                this.resolutionViewer.style.display = 'none';
                this.updateResizeBarDimensions();
                window.onmousemove = null;
                window.onmouseup = null;
            };
        });
    }

    calcAddedPixelsToCanvas(client, direction, dimension) {
        return (client - (this.canvasComponent.canvasNode.getBoundingClientRect()[direction] + this.canvasComponent[dimension])) *2;
    }
}