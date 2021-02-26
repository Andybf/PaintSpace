/*
 * PaintSpace3
 *  Created By: Anderson Bucchianico
 *        Date: 20/fev/2021
 * Description: Resize module, designed to work higly coupled with canvas. 
*/

export default class Resize extends HTMLElement {

    /* Attributes =========================================================== */

    cvsModRef;
    verticalResizeNode;
    horizontalResizeNode;
    resolutionViewer;
    confirmMessage;

    /* Constructors ========================================================= */

    constructor() {
        super();
        this.innerHTML = `
            <div class="resize" id='resize-width'></div>
            <div class="resize" id='resize-height'></div>
            <section id="resolution-viewer"></section>
        `;
    }

    connectedCallback() {
    }

    init (canvasModuleReference) {
        this.cvsModRef = canvasModuleReference;
        this.confirmMessage =
            `Confirm screen resizing? 
            All the drawnings will be erased after performing the action.`
        this.verticalResizeNode = this.querySelector('#resize-width');
        this.horizontalResizeNode = this.querySelector('#resize-height');
        this.resolutionViewer = this.querySelector('#resolution-viewer');
        this.updateResizeBarPositions();
        this.updateResizeBarDimensions();
        this.addVerticalBarEventListener();
        this.addHorizontalBarEventListener();
    }

    /* Class Methods ======================================================== */

    updateResizeBarDimensions() {
        this.verticalResizeNode.style['height'] =
            this.cvsModRef.canvasNode.height +'px'
        ;
        this.horizontalResizeNode.style['width'] =
            this.cvsModRef.canvasNode.width +'px'
        ;
        this.updateResizeBarPositions();
    }

    updateResizeBarPositions() {
        this.verticalResizeNode.style['left'] =
            this.cvsModRef.canvasNode.getBoundingClientRect().left +
            this.cvsModRef.width +'px'
        ;
        this.horizontalResizeNode.style['top'] =
            this.cvsModRef.canvasNode.getBoundingClientRect().top +
            this.cvsModRef.height +'px'
        ;
        this.horizontalResizeNode.style['left'] = 
            this.cvsModRef.canvasNode.getBoundingClientRect().left + 'px'
        ;
    }

    addVerticalBarEventListener() {
        this.verticalResizeNode.addEventListener('mousedown', (event) => {
            let self = this;
            this.resolutionViewer.style.display = 'unset';

            function calcAddedPixelsToCanvas (event) {
                return (event.clientX -
                    (self.cvsModRef.canvasNode.getBoundingClientRect().left +
                    self.cvsModRef.width)) *2
                ;
            }
            function mouseMove(event) {
                self.verticalResizeNode.style['left'] = event.clientX + 'px';
                self.resolutionViewer.innerHTML =
                    Number(self.cvsModRef.width + calcAddedPixelsToCanvas(event)) +
                    'x' + self.cvsModRef.canvasNode.height;
            }
            function mouseUp (event) {
                if (confirm(self.confirmMessage)) {
                    self.cvsModRef.width =
                        self.cvsModRef.width + calcAddedPixelsToCanvas(event);
                    self.cvsModRef.constructDrawScreen();
                    self.updateResizeBarDimensions();
                } else {
                    self.verticalResizeNode.style['left'] =
                        Number(self.cvsModRef.width +
                            self.cvsModRef.canvasNode.getBoundingClientRect().left) +
                            'px';
                }
                self.resolutionViewer.style.display = 'none';
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

            function calcAddedPixelsToCanvas (event) {
                return (event.clientY -
                    (self.cvsModRef.canvasNode.getBoundingClientRect().top +
                    self.cvsModRef.height)) *2
                ;
            }
            function mouseMove(event) {
                self.horizontalResizeNode.style['top'] = event.clientY + 'px';
                self.resolutionViewer.innerHTML =
                    self.cvsModRef.canvasNode.width + 'x' +
                    Number(self.cvsModRef.height + calcAddedPixelsToCanvas(event));
            }
            function mouseUp (event) {
                if (confirm(self.confirmMessage)) {
                    self.cvsModRef.height =
                        self.cvsModRef.height + calcAddedPixelsToCanvas(event);
                    self.cvsModRef.constructDrawScreen();
                    self.updateResizeBarDimensions();
                } else {
                    self.horizontalResizeNode.style['top'] = self.oldResizeHeight;
                }
                self.resolutionViewer.style.display = 'none';
                window.removeEventListener('mousemove', mouseMove);
                window.removeEventListener('mouseup',   mouseUp);
            }
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup',   mouseUp);
        });
    }
}