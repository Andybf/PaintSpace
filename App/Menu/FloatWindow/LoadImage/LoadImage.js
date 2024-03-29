import AVElement from '/PaintSpace/AVmodules/AVElement.js'
export default class LoadImage extends AVElement {

    title = new String();
    canvasReference = new Object();
    imageObject = new Image();
    localization = {
        innerText : {
            'en-US' : [
                { key : 'input-button',      value : 'Choose File' },
                { key : 'label-imgname',     value : 'Select an File' },
                { key : 'label-orig-size',   value : 'Keep canvas original size'},
                { key : 'label-resize',      value : 'Resize canvas to image size'},
                { key : 'label-fill-canvas', value : 'Fill canvas with image'},
                { key : 'done-button',       value : 'Apply'},
            ],
            'pt-BR' : [
                { key : 'input-button',      value : 'Escolher Arquivo' },
                { key : 'label-imgname',     value : 'Selecione um arquivo' },
                { key : 'label-orig-size',   value : 'Manter tamanho original do canvas'},
                { key : 'label-resize',      value : 'Redimensionar canvas para tamanho da imagem'},
                { key : 'label-fill-canvas', value : 'Preencher canvas com imagem'},
                { key : 'done-button',       value : 'Aplicar'},
            ]
        }
    };

    connectedCallback() {
        this.title = 'Load Image';
        this.id = 'comp-load-image';
    }

    renderedCallback() {
        this.canvasReference = this.getParentComponent('app').getChildComponent("canvas");
        this.previewCanvasReference = this.canvasReference.getChildComponent('preview');
        this.resizeReference = this.canvasReference.body.querySelector("comp-resize");
        this.loadInput = this.body.querySelector('input[id*=loadimage-input]');
        this.previewImage = this.body.querySelector("img[id*='preview-image']");
        this.doneButton = this.body.querySelector("button[id*='done-button']");
        this.body.querySelector("button[id*='input-button']").addEventListener(
            'click', () => {
                this.loadInput.click();
            }
        );
        this.loadInput.addEventListener('change', (event) => {
            this.loadImageFromClient(event);
        });
        this.doneButton.addEventListener('click', (event) => {
            this.setImagePosition();
        });
    }

    loadImageFromClient(event) {
        let file = event.target.files[0];
        this.body.querySelector("label[id*='label-imgname']").innerText = file.name;
        let fileReader = new FileReader();
        fileReader.onload = (subEvent) => {
            let base64ImgData = subEvent.target.result;
            this.previewImage.setAttribute('src',base64ImgData);
            this.imageObject.src = base64ImgData;
            this.doneButton.classList.remove('disabled');
            this.body.querySelector("ul").classList.remove('disabled');
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
            case 'resize-canvas':
                this.previewCanvasReference.height = this.imageObject.height;
                this.previewCanvasReference.width = this.imageObject.width;
                this.canvasReference.height = this.imageObject.height;
                this.canvasReference.width = this.imageObject.width;
                this.canvasReference.constructDrawScreen();
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