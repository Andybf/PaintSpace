import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class Settings extends AVElement {

    title;
    settings;
    Objects = new Object();

    renderedCallback() {
        this.body.querySelector("input[id='dark-mode']").addEventListener('change', (event) => {
            this.toogleDarkMode();
        });
        this.body.querySelector("input[id='dynamic-logo']").addEventListener('change', (event) => {
            this.toggleDynamicColorTitle();
        });
    }

    toogleDarkMode() {
        let htmlNode = document.querySelector('html');
        if (htmlNode.className.includes("dark-theme")) {
            htmlNode.classList.remove("dark-theme");
            htmlNode.classList.add("light-theme");
        } else {
            htmlNode.classList.remove("light-theme");
            htmlNode.classList.add("dark-theme");
        }
    }

    toggleDynamicColorTitle(){
        let app = this.getParentComponents()[1];
        if (app.titleAnimationId != 0) {
            app.titleAnimationId = 0;
        } else {
            app.dynamicLogo();
        }
    }
}