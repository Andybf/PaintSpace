import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class ToolOptions extends AVElement {

    selectedTool;
    canvas = new Object();

    renderedCallback(){
        this.canvas = this.getParentComponent('app').getChildComponent("canvas");
    }

    show(object) {
        let elementContainer = document.createElement('div');
        elementContainer.classList.add('global-tool-container');
        for (let key in object.options) {
            elementContainer.appendChild(this.createInput(object.options[key]));
        };
        this.body.appendChild(elementContainer);
    }

    createInput(toolOption) {
        let container = document.createElement("div");
        container.classList.add("tooloption-container");

        let labelNode = document.createElement("label");
        labelNode.innerText = toolOption['label'];
        container.appendChild(labelNode);

        if (toolOption['type'] == 'number') {
            let numberAdd = document.createElement('button');
            numberAdd.classList.add("number-option");
            numberAdd.innerText = '';
        }
        if (toolOption['type'] == 'color') {
            let colorPicker = document.createElement('button');
            colorPicker.classList.add("color-option");
            colorPicker.addEventListener('click', event => {
                this.canvas.selectedTool.eventsActive = false;
                this.colorPickerOnClick(event);
            });
            container.appendChild(colorPicker);
        }
        let input = document.createElement("input");
        input.setAttribute("type", toolOption['type']);
        input.classList.add("tooloption");
        input.value = toolOption['value'];
        input.onchange = function() {
            toolOption['value'] = this.value;
        };
        container.appendChild(input);
        return container;
    }

    colorPickerOnClick(buttonEvt) {
        let colorPickerButton = buttonEvt.currentTarget;
        colorPickerButton.classList.add("tool-item-active");
        this.canvas.canvasNode.onmousedown = (event) => {
            function rgbToHex(color) {
                let hex = color.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }
            let imgData = this.canvas.context.getImageData(event.offsetX, event.offsetY, 1, 1).data;
            colorPickerButton.nextSibling.value = `#${rgbToHex(imgData[0])}${rgbToHex(imgData[1])}${rgbToHex(imgData[2])}`;
            colorPickerButton.nextSibling.onchange();
            colorPickerButton.classList.remove("tool-item-active");
            this.canvas.canvasNode.onmousedown = null;
            this.canvas.selectedTool.eventsActive = true;
        }
    }

    deactivateCurrentTool() {
        while (this.body.childNodes.length > 1) {
            this.body.removeChild(this.body.lastChild);
        };
    }
}