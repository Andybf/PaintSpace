import AVElement from "/PaintSpace/AVmodules/AVElement.js";

export default class Text extends AVElement{

    name = 'text';
    label = 'Text';
    cursor = 'text';
    eventsActive = true;
    options = {
        contentText : {
            label : 'Content',
            value : 'test',
            type : 'text'
        },
        bkgColor : {
            label : 'Bkg Color',
            value : '#333',
            type : 'color'
        },
        fontSize : {
            label : 'Font Size',
            value : 30,
            type : 'number'
        },
        fontFamily : {
            label : 'Font Family',
            value : 'Comic Sans MS',
            type : 'text'
        }
    }

    renderedCallback(){
        this.body.addEventListener('click', (event) => {
            this.toolOptions = this.getParentComponents()[1].body.querySelector("comp-tooloptions");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = this.getParentComponents()[1].body.querySelector("comp-canvas");
            this.canvas.activateObject(this);
        });
    }

    drawDown(canvasComp,event){
        canvasComp.context.font = `
            ${this.options['fontSize'].value}px 
            ${this.options['fontFamily'].value}
        `;
        canvasComp.context.textAlign = 'center';
        canvasComp.context.fillText(
            this.options['contentText'].value,
            event.layerX,
            event.layerY + 10
        );
        canvasComp.context.fillStyle = this.options['bkgColor'].value;
        canvasComp.context.fill();
        canvasComp.context.closePath();
    }

    drawMove(compCanvas,event){

    }

    drawUp(compCanvas,event){

    }

    previewMove(preview,event){
        preview.cleanPreviewDrawnings()
        this.drawDown(preview, event);
    }

    previewUp(electedTool,event) {

    }
}