import AVElement from "/PaintSpace/AVmodules/AVElement.js";
export default class About extends AVElement{

    title;

    connectedCallback() {
        this.title = 'About';
    }

}