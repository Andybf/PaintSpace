import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class App extends AVElement {

    localization = {
        innerText : {
            'en-US' : [
                { key : 'load-image',   value : 'Load Image' },
                { key : 'save-image',   value : 'Save Image' },
                { key : 'clear-canvas', value : 'Clear Canvas'},
                { key : 'resolution',   value : 'Change Resolution'},
                { key : 'settings',     value : 'Settings'},
                { key : 'about',        value : 'About'},
            ],
            'pt-BR' : [
                { key : 'load-image',   value : 'Carregar Imagem' },
                { key : 'save-image',   value : 'Salvar Imagem' },
                { key : 'clear-canvas', value : 'Limpar Tela'},
                { key : 'resolution',   value : 'Mudar Resolução'},
                { key : 'settings',     value : 'Configurações'},
                { key : 'about',        value : 'Sobre'},
            ]
        }
    };

    renderedCallback() {
        let sidePanel = this.body.querySelector("comp-side-panel");

        this.body.querySelector("button[id*='load-image']").addEventListener('click',
            (event) => {
                sidePanel.loadMenu(event.currentTarget);
            }
        );

        this.body.querySelector("button[id*='save-image']").addEventListener('click',
            (event) => {
                window.location.href =
                    sidePanel.getParentComponent('app').getChildComponent("canvas").canvasNode
                    .toDataURL().replace("image/png", "image/octet-stream");
            }
        );

        this.body.querySelector("button[id*='clear-canvas']").addEventListener('click',
            (event) => {
                sidePanel.getParentComponent('app').getChildComponent("canvas").clearScreen();
            }
        );

        this.body.querySelector("button[id*='resolution']").addEventListener('click',
            (event) => {
                sidePanel.loadMenu(event.currentTarget);
            }
        );

        this.body.querySelector("button[id*='settings']").addEventListener('click',
            (event) => {
                sidePanel.loadMenu(event.currentTarget);
            }
        );

        this.body.querySelector("button[id*='about']").addEventListener('click',
            (event) => {
                sidePanel.loadMenu(event.currentTarget);
            }
        );
        this.initializeDynamicLogo();
    }

    initializeDynamicLogo() {
        let hue = 160;
        let title = this.body.querySelector('.title').style;
        this.titleAnimationId = setInterval( () => {
            hue = hue<360 ? hue+4 : 0;
            title.backgroundImage =
                `linear-gradient(45deg, hsl(${hue},80%,70%), hsl(${hue+100},80%,70%))`;
            this.titleAnimationId == 0 ? clearInterval(1) : false;
        },999);
    }
}