/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 09/fev/2021
 * Type: Experimental Software
*/

export default class ToolOptions extends HTMLElement {

    /* Attributes =========================================================== */

    selectedTool;

    /* Constructors ========================================================= */
        
    constructor() { // When Comp Is Created;
        super();
    }

    connectedCallback() { // After Comp Load
    }

    /* Class Methods ======================================================== */

    changeCanvasCursor(newCursor){
        document.querySelector('canvas').style['cursor'] = newCursor;
    }

    show(object) {
        this.addToolLabel(object.label);
        this.changeCanvasCursor(object.cursor);

        let elementContainer = document.createElement('div');
        elementContainer.classList.add('global-tool-container');
        for (let key in object.options) {
            elementContainer.appendChild(
                this.createInput(object.options[key],object)
            );
        };
        this.appendChild(elementContainer);
    }

    addToolLabel(objectLabel) {
        let name = document.createElement("span");
        name.classList.add("tooloption-container");
        name.innerText = objectLabel;
        this.appendChild(name);
    }

    createInput(option,object) {
        let container = document.createElement("div");
        container.classList.add("tooloption-container");

        let labelNode = document.createElement("label");
        labelNode.innerText = option['label'];
        container.appendChild(labelNode);

        if (option['type'] == 'number') {
            let numberAdd = document.createElement('button');
            numberAdd.classList.add("number-option");
            numberAdd.innerText = '';
            //container.appendChild(numberAdd);
        }

        if (option['type'] == 'color') {
            let colorPicker = document.createElement('button');
            colorPicker.classList.add("color-option")
            colorPicker.addEventListener('click', (buttonEvt) => {
                object.eventsActive = false;
                buttonEvt.target.classList.add("tool-item-active");
                document.querySelector("canvas").onclick = (canvasEvt) => {
                    function rgbToHex(color) {
                        let hex = color.toString(16);
                        return hex.length == 1 ? "0" + hex : hex;
                    }
                    let cvContext = canvasEvt.target.getContext('2d');
                    let imgData = cvContext.getImageData(
                        canvasEvt.layerX, canvasEvt.layerY, 1, 1
                    ).data;
                    buttonEvt.path[1].childNodes[2].value = 
                        `#${rgbToHex(imgData[0])}${rgbToHex(imgData[1])}${rgbToHex(imgData[2])}`;
                    buttonEvt.path[1].childNodes[2].onchange();
                    buttonEvt.target.classList.remove("tool-item-active");
                    canvasEvt.target.onclick = null;
                    object.eventsActive = true;
                }
            });
            container.appendChild(colorPicker);
        }
        let input = document.createElement("input");
        input.setAttribute("type",option['type']);
        input.classList.add("tooloption");
        input.value = option['value'];
        input.onchange = function() {
            option['value'] = this.value;
        };
        container.appendChild(input);
        return container;
    }

    deactivateCurrentTool() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        };
    }

}