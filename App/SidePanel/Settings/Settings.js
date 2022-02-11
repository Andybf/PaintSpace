/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 23/mar/2021
 * Type: 
*/

import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class Settings extends AVElement {

    title;
    settings;
    Objects = [
    ]

    /* Constructors ========================================================= */
        
    constructor() {
        super();
        this.title = 'Settings';
    }

    connectedCallback() {
    }

    renderedCallback() {
        this.body.querySelector("input[id='dark-mode']").addEventListener('change', (event) => {
            this.toogleDarkMode();
        })
        this.body.querySelector("input[id='dynamic-background']").addEventListener('change', (event) => {
            this.toggleDynamicBackground();
        });
        this.body.querySelector("input[id='dynamic-logo']").addEventListener('change', (event) => {
            this.toggleDynamicLogo();
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

    toggleDynamicBackground() {
        let canvasRef = this.getParentComponents()[1].body.querySelector("comp-canvas");
        canvasRef.dynamicBgdActive = !canvasRef.dynamicBgdActive;
        canvasRef.updateBackground();
    }

    toggleDynamicLogo(){
        let app = this.getParentComponents()[1];
        if (app.titleAnimationId != 0) {
            app.titleAnimationId = 0;
        } else {
            app.dynamicLogo();
        }
    }
}