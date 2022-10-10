import AVutils from '/PaintSpace/AVmodules/AVutils.js';
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
        this.body.querySelector("select").addEventListener('change', (event) => {
            this.selectAppLanguage(event);
        });
        this.body.querySelector("select").value = document.querySelector('html').lang;
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
        let app = this.getParentComponent('app');
        if (app.titleAnimationId != 0) {
            app.titleAnimationId = 0;
        } else {
            app.initializeDynamicLogo();
        }
    }

    selectAppLanguage(event) {
        function getChildrensFromParent(parent) {
            Array.from(parent.body.querySelectorAll('*')).forEach(comp => {
                if (comp.tagName.includes("COMP-")){
                    allCompList.push(comp);
                    parent = comp;
                    getChildrensFromParent(parent);
                }
            });
        }
        let allCompList = new Array();
        allCompList.push(this.getParentComponent('app'));
        getChildrensFromParent(this.getParentComponent('app'));

        document.querySelector('html').lang = event.target.value;
        allCompList.forEach(comp => {
            if(comp.localization != null) {
                AVutils.translateComponentText(comp.localization, comp, event.target.value);
            }
        });
        
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