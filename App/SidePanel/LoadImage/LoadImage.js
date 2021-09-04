/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Prototype Date: 13/jul/2020
 * Date: 23/mar/2021
 * Type: 
*/

import AVElement from '/AVmodules/AVElement.js'
export default class LoadImage extends AVElement {

    title;
    canvasReference;
    imageObject;

    constructor() {
        super();
        this.title = 'Load Image';
        this.id = 'comp-loadimage';
    }

    connectedCallback() {

    }

    renderedCallback(){
        this.canvasReference = this.getParentComponents()[1].body.querySelector("comp-canvas");
        this.resizeReference = this.canvasReference.body.querySelector("comp-resize");
        this.loadInput = this.body.querySelector('input[id*=loadimage-input]');
        this.previewImage = this.body.querySelector("img[id*='preview-image']");
        this.doneButton = this.body.querySelector("button[id*='done-button']");
        this.body.querySelector("button[id*='loadimage-input-button']").addEventListener(
            'click', () => {
                this.loadInput.click();
            }
        );
        this.loadInput.addEventListener('change', (event) => {
            this.loadImageFromClient(event);
        });
        this.doneButton.addEventListener('click', (event) => {
            this.setImagePosition();
            this.canvasReference.updateBackground();
        });
    }

    loadImageFromClient(event) {
        let file = event.target.files[0];
        this.body.querySelector("label[id*='loadimage-label-imgname']").innerText = file.name;
        let fileReader = new FileReader();
        fileReader.onload = (subEvent) => {
            let base64ImgData = subEvent.target.result;
            this.previewImage.setAttribute('src',base64ImgData);
            this.imageObject = new Image();
            this.imageObject.src = base64ImgData;
            this.doneButton.classList.remove('disabled');
        }
        fileReader.readAsDataURL(file);
    }

    setImagePosition() {
        this.body.querySelectorAll("input[type*='radio']").forEach( (item) => {
            if (item.checked) {
                this.selectedImgPosition = item.id;
            }
        });
        switch (this.selectedImgPosition) {
            case 'orig-size':
                this.canvasReference.context.drawImage(
                    this.imageObject, 0, 0,
                    this.imageObject.width,
                    this.imageObject.height
                );
            break;
            case 'rcis':
                this.canvasReference.height = this.imageObject.height;
                this.canvasReference.width = this.imageObject.width;
                this.canvasReference.constructDrawScreen();
                this.resizeReference.updateResizeBarPositions();
                this.resizeReference.updateResizeBarDimensions();
                this.canvasReference.context.drawImage(
                    this.imageObject, 0, 0,
                    this.imageObject.width,
                    this.imageObject.height
                );
            break;
            case 'fill':
                this.canvasReference.context.drawImage(
                    this.imageObject, 0, 0,
                    this.canvasReference.width,
                    this.canvasReference.height
                );
            break;
        }
    }
}