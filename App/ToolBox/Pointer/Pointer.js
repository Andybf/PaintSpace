import AVElement from "/PaintSpace/AVmodules/AVElement.js"
export default class Pointer extends AVElement {
    
    name = 'pointer';
    label = 'Pointer';
    cursor = 'default';
    eventsActive = true;
    options = new Object();

    renderedCallback(){
        this.body.addEventListener('click', (event) => {
            this.toolOptions = this.getParentComponent('app').getChildComponent("tool-options");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = this.getParentComponent('app').getChildComponent("canvas");
            this.canvas.activateObject(this);
        });
    }

    drawDown() {}
    drawMove() {}
    drawUp() {}
}