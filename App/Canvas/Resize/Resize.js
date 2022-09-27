import AVElement from "/PaintSpace/AVmodules/AVElement.js";
export default class Resize extends AVElement {

    canvasComponent;
    verticalResizeNode;
    horizontalResizeNode;
    resolutionViewer;
    confirmMessage;

    renderedCallback() {
        window.addEventListener('resize', (event) => {
            this.updateResizeBarPositions();
        })
        this.init();
    }

    init () {
        this.canvasComponent = this.getParentComponent('canvas');
        this.confirmMessage =
            `Confirm screen resizing? 
            All the drawnings will be erased after performing the action.`
        this.verticalResizeNode = this.body.querySelector('#resize-width');
        this.horizontalResizeNode = this.body.querySelector('#resize-height');
        this.resolutionViewer = this.body.querySelector('#resolution-viewer');
        this.updateResizeBarPositions();
        this.updateResizeBarDimensions();
        this.addVerticalBarEventListener();
        this.addHorizontalBarEventListener();
    }

    updateResizeBarDimensions() {
        this.verticalResizeNode.style['height'] =
            this.canvasComponent.canvasNode.height +'px'
        ;
        this.horizontalResizeNode.style['width'] =
            this.canvasComponent.canvasNode.width +'px'
        ;
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

    addVerticalBarEventListener() {
        this.verticalResizeNode.addEventListener('mousedown', (event) => {
            let self = this;
            this.resolutionViewer.style.display = 'unset';
            this.canvasComponent.saveImageBuffer();

            function calcAddedPixelsToCanvas (event) {
                return (event.clientX -
                    (self.canvasComponent.canvasNode.getBoundingClientRect().left +
                    self.canvasComponent.width)) *2
                ;
            }
            function mouseMove(event) {
                self.verticalResizeNode.style['left'] = event.clientX + 'px';
                self.resolutionViewer.innerHTML =
                    Number(self.canvasComponent.width + calcAddedPixelsToCanvas(event)) +
                    'x' + self.canvasComponent.canvasNode.height;
            }
            function mouseUp (event) {
                self.canvasComponent.width =
                    self.canvasComponent.width + calcAddedPixelsToCanvas(event);
                self.canvasComponent.constructDrawScreen();
                self.canvasComponent.loadImageBuffer();
                self.resolutionViewer.style.display = 'none';
                self.updateResizeBarDimensions();
                window.removeEventListener('mousemove', mouseMove);
                window.removeEventListener('mouseup',   mouseUp);
            }
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup',   mouseUp);
        });
    }

    addHorizontalBarEventListener() {
        this.horizontalResizeNode.addEventListener('mousedown', (event) => {
            let self = this;
            this.resolutionViewer.style.display = 'unset';
            this.canvasComponent.saveImageBuffer();

            function calcAddedPixelsToCanvas (event) {
                return (event.clientY -
                    (self.canvasComponent.canvasNode.getBoundingClientRect().top +
                    self.canvasComponent.height)) *2
                ;
            }
            function mouseMove(event) {
                self.horizontalResizeNode.style['top'] = event.clientY + 'px';
                self.resolutionViewer.innerHTML =
                    self.canvasComponent.canvasNode.width + 'x' +
                    Number(self.canvasComponent.height + calcAddedPixelsToCanvas(event));
            }
            function mouseUp (event) {
                self.canvasComponent.height =
                    self.canvasComponent.height + calcAddedPixelsToCanvas(event);
                self.canvasComponent.constructDrawScreen();
                self.canvasComponent.loadImageBuffer();
                self.resolutionViewer.style.display = 'none';
                self.updateResizeBarDimensions();
                window.removeEventListener('mousemove', mouseMove);
                window.removeEventListener('mouseup',   mouseUp);
            }
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup',   mouseUp);
        });
    }
}