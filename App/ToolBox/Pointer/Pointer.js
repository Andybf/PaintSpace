import AVElement from "/AVmodules/AVElement.js"
export default class Pointer extends AVElement {
    
    name     = 'pointer';
    label    = 'Pointer';
    cursor   = 'default';
    eventsActive = true;
    options  = {}

    renderedCallback(){
        this.body.addEventListener('click', (event) => {
            this.toolOptions = this.getParentComponents()[1].body.querySelector("comp-tooloptions");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = this.getParentComponents()[1].body.querySelector("comp-canvas");
            this.canvas.activateObject(this);
        });
    }

    drawDown() {}
    drawMove() {}
    drawUp() {}
}