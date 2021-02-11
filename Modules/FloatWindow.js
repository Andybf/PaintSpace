/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 10/feb/2021
 * Type: Image Editor
*/

export default class floatWindow extends HTMLElement {

    /* Attributes =========================================================== */

    windowContent;

    /* Constructors ========================================================= */

    constructor() { // When Comp Is Created;
        super();
        this.self = this;
        this.innerHTML = `
        <section class="float-window" id="window">
            <div class="header">
                <span id="window-title" class="window-title"></span>
                <button class="window-close" id="window-close">x</button>
            </div>
            <div class="content" id="content"></div>
        </section>
        `;
    }

    connectedCallback() { // After Comp Load
        this.windowContent = this.querySelector("#content");
        this.enableCloseWindow();
        this.enableDragAndDrop();
    }

    /* Class Methods ======================================================== */

    changeTitle(newTitle) {
        this.querySelector("#window-title").innerText = newTitle;
    }

    fillContent(object) {

        function createConfigSection(item) {
            function createConfig(config,ref) {
                let configElement = document.createElement("div");
                configElement.classList.add("config-row");
                let configLabel = document.createElement("label");
                configLabel.innerText = config.label;
                configElement.appendChild(configLabel);
                let configInput = document.createElement("input");
                configInput.setAttribute("type",config['type']);
                configInput.addEventListener('click',
                    ref.reference[config.func]
                );
                configInput.value = ref.reference[config.apiName];
                configElement.appendChild(configInput);
                return configElement;
            }
            let container = document.createElement("div");
            container.classList.add("config-container");
            let title = document.createElement("h5");
            title.classList.add("config-title");
            title.innerText = item.name;
            container.appendChild(title);
            item.settings.forEach( (config) => {
                container.appendChild(createConfig(config,item))
            });
            return container;
        }
        object.forEach( (item) => {
            this.windowContent.appendChild(createConfigSection(item));
        });
    }

    enableCloseWindow() {
        document.querySelector('#window-close').addEventListener('click',
        () => {
            document.querySelector('#window').style.display = 'none';
            while (document.querySelector("#content").firstChild) {
                document.querySelector("#content").removeChild(
                    document.querySelector("#content").firstChild
                );
            };
        });
    }

    enableDragAndDrop() {
        let win = document.querySelector('#window');
        win.addEventListener('mousedown',(event) => {
            
            if (event.clientY -
                parseInt(window.getComputedStyle(win,null).top) < 30
            ) {
        
                let mouseX = event.clientX;
                let mouseY = event.clientY;
        
                window.addEventListener('mousemove', mouseMove);
                window.addEventListener('mouseup', mouseUp);
        
                function mouseUp(event) {
                    window.removeEventListener('mousemove',mouseMove);
                    window.removeEventListener('mouseup',mouseUp);
                }
                function mouseMove(event) {
                    setTimeout(function(){
                        let newX = mouseX - event.clientX;
                        let newY = mouseY - event.clientY;
                        win.style.left = win.getBoundingClientRect().left -
                            newX + "px";
                        win.style.top  = win.getBoundingClientRect().top  -
                            newY + "px";
                        mouseX = event.clientX;
                        mouseY = event.clientY;
                    },17); // 1000ms
                }
            }
        });
    }

}