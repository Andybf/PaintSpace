import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class App extends AVElement {

    isBackgroundColored = false;
    hue = Math.random() * 360;

    renderedCallback() {
        this.updateColors();
        this.initializeDynamicLogo();
    }

    initializeDynamicLogo() {
        this.titleAnimationId = setInterval( () => {
            this.updateColors();
            this.titleAnimationId == 0 ? clearInterval(1) : false;
        },1500);
    }

    updateColors() {
        this.hue = (this.hue < 360) ? this.hue + 4 : 0;
        let gradientColor = `linear-gradient(45deg, hsl(${this.hue},80%,70%), hsl(${this.hue+100},80%,70%))`;
        this.body.querySelector('h1').style.backgroundImage = gradientColor;
        document.querySelector('body').style.backgroundImage = gradientColor;
    }
}