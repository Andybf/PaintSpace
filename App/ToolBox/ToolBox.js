import AVElement from "/PaintSpace/AVmodules/AVElement.js";
import AVModule from "/PaintSpace/AVmodules/AVModule.js";

export default class ToolBox extends AVElement {

    renderedCallback() {
        Array.from(this.body.querySelectorAll('*')).forEach( elementModule => {
            if (elementModule.tagName.includes("MDL-")){
                AVModule.importModuleDefinition(elementModule, this.getComponentRoot());
            }
        });
    }
}