import AVElement from "/PaintSpace/AVmodules/AVElement.js";
export default class SidePanel extends AVElement {

    windowContent;

    connectedCallback() {
        this.style.display = 'none';    
    }

    renderedCallback() {
        this.windowContent = this.body.querySelector("#content");
        this.enableCloseWindow();
    }

    makeVisible() {
        this.style['display'] = 'inherit';
    }
    makeInvisible() {
        this.style['display'] = 'none';
    }

    loadMenu(target){
        this.cleanContent();
        Array.from(this.windowContent.children).forEach( node => {
            if (node.localName === target.dataset.compname) {
                node.style.display = 'unset'
            }
        });
        this.changeTitle(target.innerText);
        this.makeVisible();
    }

    changeTitle(newTitle) {
        this.body.querySelector("#window-title").innerText = newTitle;
    }

    cleanContent() {
        Array.from(this.windowContent.children).forEach( node => {
            node.style.display = 'none';
        });
    }

    enableCloseWindow() {
        this.body.querySelector('#window-close').addEventListener('click',() => {
            this.makeInvisible();
            this.cleanContent();
        });
    }
}