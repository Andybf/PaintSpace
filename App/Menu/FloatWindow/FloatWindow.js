import AVElement from "/PaintSpace/AVmodules/AVElement.js";

export default class FloatWindow extends AVElement {

    panelContent;

    connectedCallback() {
        this.style.display = 'none';    
    }

    renderedCallback() {
        this.panelContent = this.body.querySelector("#content");
        this.enableCloseWindow();
    }

    makePanelVisible() {
        this.style['display'] = 'inherit';
    }
    makePanelInvisible() {
        this.style['display'] = 'none';
    }

    loadMenu(target) {
        this.cleanContent();
        this.loadNewChildrenComponent(target.dataset.compname);
        let newMenu = document.createElement(target.dataset.compname);
        this.panelContent.appendChild(newMenu);
        this.makePanelVisible();
        this.changeTitle(target.innerText);
    }

    changeTitle(newTitle) {
        this.body.querySelector("#window-title").innerText = newTitle;
    }

    cleanContent() {
        if (this.panelContent.firstElementChild) {
            this.panelContent.removeChild(this.panelContent.firstElementChild);
        }
    }

    enableCloseWindow() {
        this.body.querySelector('#window-close').addEventListener('click',() => {
            this.makePanelInvisible();
            this.cleanContent();
            this.getParentComponent('menu').toggleListContainer();
        });
    }
}