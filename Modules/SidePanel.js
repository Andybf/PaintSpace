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
        this.style.display = 'none'
        this.innerHTML = `
        <section class="float-window" id="window">
            <div class="header">
                <span id="window-title" class="window-title"></span>
                <button class="window-close" id="window-close">x</button>
                <hr size="1" />
            </div>
            <div class="content" id="content"></div>
        </section>
        `;
    }

    connectedCallback() { // After Comp Load
        this.windowContent = this.querySelector("#content");
        this.enableCloseWindow();
    }

    /* Class Methods ======================================================== */

    makeVisible() {
        this.style['display'] = 'inherit';
    }
    makeInvisible() {
        this.style['display'] = 'none';
    }

    cleanContent() {
        while (document.querySelector("#content").firstChild) {
            document.querySelector("#content").removeChild(
                document.querySelector("#content").firstChild
            );
        };
    }

    fillContent(object) {
        this.cleanContent();
        function changeTitle(self, newTitle) {
            self.querySelector("#window-title").innerText = newTitle;
        }
        changeTitle(this,object.title)
        this.windowContent.appendChild(object);
    }

    enableCloseWindow() {
        document.querySelector('#window-close').addEventListener('click',
        () => {
            this.makeInvisible();
            this.cleanContent();
        });
    }
}