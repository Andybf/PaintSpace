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