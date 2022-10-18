import AVElement from "/PaintSpace/AVmodules/AVElement.js";

export default class Preview extends AVElement {

    canvas;
    context;
    width = window.innerWidth/1.25;
    height = window.innerHeight/1.33;
    background = '#fff';

    renderedCallback() {
        this.canvas = this.getParentComponent('canvas');
        this.previewCanvas = this.body.querySelector("canvas");
        this.context = this.previewCanvas.getContext("2d");
        this.context.canvas.width = this.width;
        this.context.canvas.height = this.height;
        this.cleanPreviewDrawnings();

        this.canvas.canvasNode.addEventListener('mouseout', event => {
            this.cleanPreviewDrawnings();
        });

        this.canvas.addEventListener('move', event => {
            selectedTool.previewMove(this, event);
        });

        this.canvas.previewMove = (selectedTool,event) => {
            if (selectedTool.previewMove) {
                selectedTool.previewMove(this, event);
            }
        }

        this.canvas.previewDown = (selectedTool,event) => {
            if (selectedTool.previewDown) {
                selectedTool.previewDown(this, event);
            }
        }

        this.canvas.previewUp = (selectedTool,event) => {
            if (selectedTool.previewUp) {
                selectedTool.previewUp(this, event);
            }
        }
    }

    cleanPreviewDrawnings() {
        this.context.canvas.width = this.width;
        this.context.canvas.height = this.height;
        this.context.clearRect(0,0, this.width, this.height);
    }
} 