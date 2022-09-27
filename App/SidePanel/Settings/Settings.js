import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class Settings extends AVElement {

    title;
    settings;
    Objects = new Object();

    renderedCallback() {
        this.body.querySelector("input[id='dark-mode']").addEventListener('change', () => {
            this.toogleDarkMode();
        });
        this.body.querySelector("input[id='dynamic-logo']").addEventListener('change', () => {
            this.toggleDynamicColorTitle();
        });
        this.body.querySelector('button').addEventListener('click', () => {
            this.deleteBrowserCache();
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

    deleteBrowserCache() {
        window.caches.keys().then( cacheKeys => {
            cacheKeys.map( key => {
                window.caches.delete(key);
            });
        })
        window.location = window.location;
    }
}