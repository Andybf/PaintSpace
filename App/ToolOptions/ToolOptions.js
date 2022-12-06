import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class ToolOptions extends AVElement {

    canvas = new Object();

    renderedCallback(){
        this.canvas = this.getParentComponent('app').getChildComponent("canvas");
    }

    show(object) {
        let elementContainer = document.createElement('section');

        let toolLabel = document.createElement('span');
        toolLabel.innerText = object.label;
        elementContainer.appendChild(toolLabel);

        for (let key in object.options) {
            elementContainer.appendChild(this.createInput(object.options[key]));
        };
        this.body.appendChild(elementContainer);
    }

    createInput(toolOption) {
        let content = document.importNode(this.template.querySelector('#'+toolOption['type']).content,true);
        content.querySelector('label').innerText = toolOption['label'];
        content.querySelector('input').value = toolOption['value'];
        content.querySelector('input').onchange = event => {this.inputChangeValue(event, toolOption)};
        content.querySelector('input').onkeyup = event => {this.inputChangeValue(event, toolOption)};
        if (toolOption['type'] == 'color') {
            content.querySelector('button').onclick = event => {
                this.canvas.selectedTool.eventsActive = false;
                this.colorPickerOnClick(event);
            };
        }
        return content;
    }

    inputChangeValue(event, tool) {
        if (event) {
            if (event.target.type == 'checkbox') {
                tool['value'] = event.target.checked;
            } else {
                tool['value'] = event.target.value;
            }
        }
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
            colorPickerButton.nextElementSibling.value = `#${rgbToHex(imgData[0])}${rgbToHex(imgData[1])}${rgbToHex(imgData[2])}`;
            colorPickerButton.nextElementSibling.dispatchEvent(new Event('change'));
            colorPickerButton.classList.remove("tool-item-active");
            this.canvas.canvasNode.onmousedown = null;
            this.canvas.selectedTool.eventsActive = true;
        }
    }

    deactivateCurrentTool() {
        if (this.canvas.drag) {
            this.canvas.drag = false;
        }
        while (this.body.childNodes.length > 1) {
            this.body.removeChild(this.body.lastChild);
        };
    }
}