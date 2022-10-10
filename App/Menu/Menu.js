import AVElement from '/PaintSpace/AVmodules/AVElement.js'

export default class Menu extends AVElement {

    localization = {
        innerText : {
            'en-US' : [
                { key : 'load-image',   value : 'Load Image...' },
                { key : 'save-image',   value : 'Save Image' },
                { key : 'clear-canvas', value : 'Clear Canvas'},
                { key : 'resolution',   value : 'Change Resolution...'},
                { key : 'settings',     value : 'Settings...'},
                { key : 'about',        value : 'About...'},
            ],
            'pt-BR' : [
                { key : 'load-image',   value : 'Carregar Imagem...' },
                { key : 'save-image',   value : 'Salvar Imagem' },
                { key : 'clear-canvas', value : 'Limpar Tela'},
                { key : 'resolution',   value : 'Mudar Resolução...'},
                { key : 'settings',     value : 'Configurações...'},
                { key : 'about',        value : 'Sobre...'},
            ]
        }
    };

    listContainer = new Object();

    renderedCallback() {
        this.listContainer = this.body.querySelector("#menu-container");
        this.background = this.body.querySelector("#menu-background");

        this.body.querySelector('#menu-button').addEventListener('click', event => {
            this.toggleListContainer();
        });
        this.body.querySelector('#menu-background').addEventListener('click', event => {
            this.toggleListContainer();
        });


        let floatWindow = this.body.querySelector("comp-float-window");

        this.body.querySelector("#load-image").addEventListener('click', event => {
            floatWindow.loadMenu(event.currentTarget);
            this.toogleListContainerVisibility();
        });

        this.body.querySelector("#save-image").addEventListener('click', event => {
            window.location.href =
                floatWindow.getParentComponent('app').getChildComponent("canvas").canvasNode
                .toDataURL().replace("image/png", "image/octet-stream");
            this.toggleListContainer();
        });

        this.body.querySelector("#clear-canvas").addEventListener('click', event => {
            floatWindow.getParentComponent('app').getChildComponent("canvas").clearScreen();
            this.toggleListContainer();
        });

        this.body.querySelector("#resolution").addEventListener('click', event => {
            floatWindow.loadMenu(event.currentTarget);
            this.toogleListContainerVisibility();
        });

        this.body.querySelector("#settings").addEventListener('click', event => {
            floatWindow.loadMenu(event.currentTarget);
            this.toogleListContainerVisibility();
        });

        this.body.querySelector("#about").addEventListener('click', event => {
            floatWindow.loadMenu(event.currentTarget);
            this.toogleListContainerVisibility();
        });
    }

    toogleListContainerVisibility() {
        this.listContainer.style.visibility = this.listContainer.style.visibility == 'hidden' ? 'visible' : 'hidden';
        this.body.querySelector('#menu-button').style.zIndex = (this.body.querySelector('#menu-button').style.zIndex == '0') ? null : '0';
    }

    toggleListContainer(event) {
        if (getComputedStyle(this.listContainer).display == "none") {
            this.listContainer.style.display = "initial";
            this.background.style.display = "initial";
            this.listContainer.style.visibility = null;
        } else {
            this.listContainer.style.display = "none";
            this.background.style.display = "none";
            this.getChildComponent('float-window').makePanelInvisible();
            this.listContainer.style.visibility = null;
            this.body.querySelector('#menu-button').style.zIndex = null;
        } 
    }
}