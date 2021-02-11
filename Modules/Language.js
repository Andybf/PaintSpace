/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 10/feb/2021
 * Type: Image Editor
*/

export default class Language {

    /* Attributes =========================================================== */

    languages =
    {
    'en-US' : [
        { key : 'load-image',   value : 'Load Image' },
        { key : 'save-image',   value : 'Save Image' },
        { key : 'clear-canvas', value : 'Clear Canvas'},
        { key : 'resolution',   value : 'Change Resolution'},
        { key : 'zoom',         value : 'Zoom'},
        { key : 'settings',     value : 'Settings'},
        { key : 'about',        value : 'About'},
    ],
    'pt-BR' : [
        { key : 'load-image',   value : 'Carregar Imagem' },
        { key : 'save-image',   value : 'Salvar Imagem' },
        { key : 'clear-canvas', value : 'Limpar Canvas'},
        { key : 'resolution',   value : 'Mudar Resolução'},
        { key : 'zoom',         value : 'Zoom'},
        { key : 'settings',     value : 'Configurações'},
        { key : 'about',        value : 'Sobre'},
    ]
    };
    selectedLanguage;

    /* Constructors ========================================================= */

    constructor() { // When Comp Is Created;
        this.selectedLanguage = navigator.language;
        this.switchLanguage();
    }

    /* Class Methods ======================================================== */

    switchLanguage() {
        this.languages[this.selectedLanguage].forEach( (item,index) => {
            document.querySelector("#"+item['key']).innerText = item['value'];
        });
    }

}
