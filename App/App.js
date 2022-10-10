import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class App extends AVElement {


    renderedCallback() {
        this.initializeDynamicLogo();
    }

    initializeDynamicLogo() {
        let hue = 160;
        let title = this.body.querySelector('h1').style;
        this.titleAnimationId = setInterval( () => {
            hue = hue<360 ? hue+4 : 0;
            title.backgroundImage =
                `linear-gradient(45deg, hsl(${hue},80%,70%), hsl(${hue+100},80%,70%))`;
            this.titleAnimationId == 0 ? clearInterval(1) : false;
        },999);
    }
}