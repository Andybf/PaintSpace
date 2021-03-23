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

    addToolLabel(objectLabel) {
        let name = document.createElement("span");
        name.classList.add("tooloption-container");
        name.innerText = objectLabel;
        this.appendChild(name);
    }

    show(object) {
        function createInput(object) {

            let container = document.createElement("div");
            container.classList.add("tooloption-container");

            let labelNode = document.createElement("label");
            labelNode.innerText = object['label'];
            container.appendChild(labelNode);

            let input = document.createElement("input");
            input.setAttribute("type",object['type']);
            input.classList.add("tooloption");
            input.value = object['value'];
            input.addEventListener('change', (event) => {
                object['value'] = event.target.value;
                console.log(object);
            });
            container.appendChild(input);

            return container;
        }

        this.addToolLabel(object.label);
        this.changeCanvasCursor(object.cursor);

        let elementContainer = document.createElement('div');
        elementContainer.classList.add('global-tool-container');
        for (let key in object.options) {
            elementContainer.appendChild(createInput(object.options[key]));
        };
        this.appendChild(elementContainer);
    }

    deactivateCurrentTool() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        };
    }

}