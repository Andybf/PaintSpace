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

    show(object) {
        function createInput(label, type, value) {

            let container = document.createElement("div");
            container.classList.add("tooloption-container");

            let labelNode = document.createElement("label");
            labelNode.innerText = label;
            container.appendChild(labelNode);

            let input = document.createElement("input");
            input.setAttribute("type",type);
            input.classList.add("tooloption");
            input.value = object[value];
            input.addEventListener('change', (event) => {
                object[value] = event.target.value;
            });
            container.appendChild(input);

            return container;
        }

        let name = document.createElement("span");
        name.classList.add("tooloption-container");
        name.innerText = object.name;
        this.appendChild(name);

        this.appendChild(createInput("Size","number",'size'));
        this.appendChild(createInput("Rotation","number",'rotation'));
        this.appendChild(createInput("border","number","border"));
        this.appendChild(createInput("Border Color","color",'brdColor'));
        this.appendChild(createInput("bkg Color","color",'bkgColor'));        
    }

    clear() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        };
    }

}