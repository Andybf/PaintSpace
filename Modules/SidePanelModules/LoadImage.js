/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Prototype Date: 13/jul/2020
 * Date: 23/mar/2021
 * Type: 
*/

export default class Settings extends HTMLElement {

    /* Attributes =========================================================== */

    title;
    canvasReference;
    imageObject;

    /* Constructors ========================================================= */

    constructor() {
        super();
        this.title = 'Load Image';
        this.id = 'comp-loadimage';
        this.innerHTML = `
            <input type="file" id="loadimage-input"/>
            <div class="loadimage-input-container">
                <button class="loadimage-button" id="loadimage-input-button">Choose File</button>
                <label id="loadimage-label-imgname">Select an File</label>
            </div>
            <img id="preview-image"/>
            <ul class="loadimage-img-m-container">
                <li class="radio-item">
                    <input type="radio" name="position" id="orig-size" value="0"
                        checked>
                    <label for="orig-size">Original Size</label>
                </li>
                <li class="radio-item">
                    <input type="radio" name="position" id="rcis" value="0">
                    <label for="rcis">Resize Canvas to Image Size</label>
                </li>
                <li class="radio-item">
                    <input type="radio" name="position" id="fill" value="0">
                    <label for="fill">Fill Canvas with Image</label>
                </li>
            </ul>
            <button id="loadimage-done-button" class="loadimage-button disabled">Apply</button>
        `;
    }

    connectedCallback() {

    }

    init(cvRef,resize) {
        this.canvasReference = cvRef;
        this.resizeReference = resize;
        this.loadInput = this.querySelector('input[id*=loadimage-input]');
        this.querySelector("button[id*='loadimage-input-button']").addEventListener(
            'click', () => {
                this.loadInput.click();
            }
        );

        this.previewImage = this.querySelector("img[id*='preview-image']");
        this.doneButton = this.querySelector("button[id*='loadimage-done-button']");

        this.loadInput.addEventListener('change', (event) => {
            let file = event.target.files[0];
            this.querySelector("label[id*='loadimage-label-imgname']").innerText = file.name;
            let fileReader = new FileReader();
            fileReader.onload = (subEvent) => {
                let base64ImgData = subEvent.target.result;
                this.previewImage.setAttribute('src',base64ImgData);
                
                this.imageObject = new Image();
                this.imageObject.src = base64ImgData;
                this.doneButton.classList.remove('disabled');
            }
            fileReader.readAsDataURL(file);
        });

        this.querySelector("button[id*='loadimage-done-button']").addEventListener('click', (event) => {
            this.querySelectorAll("input[type*='radio']").forEach( (item) => {
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
            this.updateBackground();
        });
    }

    /* Class Methods ======================================================== */


    updateBackground() {
        document.querySelector('body').style.backgroundImage =
            `url(${this.canvasReference.canvasNode.toDataURL("image/png")}`
        ;
    }
}