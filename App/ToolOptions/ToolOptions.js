/*
 * PaintSpace
 * Created By: Anderson Bucchianico
 * Date: 09/fev/2021
*/

import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class ToolOptions extends AVElement {

    selectedTool;

    constructor() {
        super();
    }

    renderedCallback(){
        this.canvas = this.getParentComponents()[0].body.querySelector("comp-canvas");
    }

    show(object) {
        this.addToolLabel(object.label);

        let elementContainer = document.createElement('div');
        elementContainer.classList.add('global-tool-container');
        for (let key in object.options) {
            elementContainer.appendChild(
                this.createInput(object.options[key],object)
            );
        };
        this.body.appendChild(elementContainer);
    }

    addToolLabel(objectLabel) {
        let name = document.createElement("span");
        name.classList.add("tooloption-container");
        name.innerText = objectLabel;
        this.body.appendChild(name);
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
                let colorPickerButton = buttonEvt.currentTarget;
                colorPickerButton.classList.add("tool-item-active");
                this.canvas.canvasNode.onclick = (canvasEvt) => {
                    function rgbToHex(color) {
                        let hex = color.toString(16);
                        return hex.length == 1 ? "0" + hex : hex;
                    }
                    let cvContext = canvasEvt.target.getContext('2d');
                    let imgData = cvContext.getImageData(
                        canvasEvt.layerX, canvasEvt.layerY, 1, 1
                    ).data;
                    colorPickerButton.nextSibling.value = 
                        `#${rgbToHex(imgData[0])}${rgbToHex(imgData[1])}${rgbToHex(imgData[2])}`;
                    colorPickerButton.nextSibling.onchange();
                    colorPickerButton.classList.remove("tool-item-active");
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
        while (this.body.childNodes.length > 1) {
            this.body.removeChild(this.body.lastChild);
        };
    }
}