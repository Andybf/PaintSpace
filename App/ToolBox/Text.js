export default class Text extends HTMLElement {

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

    constructor() {
        super();
        this.innerHTML = `
            <button class="tool-item" id="text" title="">
                <img id="free-draw-img" src="/PaintSpace/media/image/text.svg"/>
            </button>
        `;
        this.initialize();
    }

    initialize(){
        this.firstElementChild.addEventListener('click', (event) => {
            this.toolOptions = document.querySelector('comp-app').getChildComponent("tool-options");
            this.toolOptions.deactivateCurrentTool();
            this.toolOptions.show(this);
            this.canvas = document.querySelector('comp-app').getChildComponent("canvas");
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
            event.offsetX,
            event.offsetY + 10
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