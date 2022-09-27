import AVElement from "/PaintSpace/AVmodules/AVElement.js";
export default class Resize extends AVElement {

    canvasComponent;
    previewComponent;
    verticalResizeNode;
    horizontalResizeNode;
    resolutionViewer;
    confirmMessage;

    renderedCallback() {
        window.addEventListener('resize', (event) => {
            this.updateResizeBarPositions();
        })
        this.initialize();
    }

    initialize() {
        this.canvasComponent = this.getParentComponent('canvas');
        this.previewComponent = this.canvasComponent.getChildComponent('preview');
        this.verticalResizeNode = this.body.querySelector('#resize-width');
        this.horizontalResizeNode = this.body.querySelector('#resize-height');
        this.resolutionViewer = this.body.querySelector('#resolution-viewer');
        this.updateResizeBarPositions();
        this.updateResizeBarDimensions();
        this.addVerticalBarEventListener(this.verticalResizeNode, 'width', 'left', 'clientX');
        this.addVerticalBarEventListener(this.horizontalResizeNode, 'height', 'top', 'clientY');
    }

    updateResizeBarDimensions() {
        this.verticalResizeNode.style['height'] = this.canvasComponent.canvasNode.height +'px';
        this.horizontalResizeNode.style['width'] = this.canvasComponent.canvasNode.width +'px';
        this.updateResizeBarPositions();
    }

    updateResizeBarPositions() {
        this.verticalResizeNode.style['left'] =
            this.canvasComponent.canvasNode.getBoundingClientRect().left +
            this.canvasComponent.width +'px'
        ;
        this.verticalResizeNode.style['top'] =
            this.canvasComponent.canvasNode.getBoundingClientRect().top + 'px'
        ;
        this.horizontalResizeNode.style['top'] =
            this.canvasComponent.canvasNode.getBoundingClientRect().top +
            this.canvasComponent.height +'px'
        ;
        this.horizontalResizeNode.style['left'] = 
            this.canvasComponent.canvasNode.getBoundingClientRect().left + 'px'
        ;
    }

    addVerticalBarEventListener(resizeBar, dimension, moveDirection, client) {
        resizeBar.addEventListener('mousedown', (event) => {
            this.resolutionViewer.style.display = 'unset';
            this.canvasComponent.saveImageBuffer();

            window.onmousemove = (event) => {
                resizeBar.style[moveDirection] = event[client] + 'px';
                this.resolutionViewer.innerHTML =
                    Number(this.canvasComponent.width +
                           this.calcAddedPixelsToCanvas(event[client],moveDirection,dimension)) + 'x' +
                           this.canvasComponent.canvasNode.height;
            };
            window.onmouseup = (event) => {
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