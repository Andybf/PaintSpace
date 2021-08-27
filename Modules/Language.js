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
    'en-US' : {
        innerText : [
            { key : 'load-image',   value : 'Load Image' },
            { key : 'save-image',   value : 'Save Image' },
            { key : 'clear-canvas', value : 'Clear Canvas'},
            { key : 'resolution',   value : 'Change Resolution'},
            { key : 'zoom',         value : 'Zoom'},
            { key : 'settings',     value : 'Settings'},
            { key : 'about',        value : 'About'},
            //{ key : 'fill',         value : 'Fill Canvas with Image'},
        ],
        titles : [
            { key : 'pointer', value : 'Pointer' },
            { key : 'brush', value : 'Brush' },
            { key : 'pencil', value : 'Pencil' },
            { key : 'line', value : 'Line' },
            { key : 'square', value : 'Rect' },
            { key : 'elipse', value : 'Elipses' },
            { key : 'polygon', value : 'Triangles' },
            { key : 'text', value : 'Text' },
        ]
    },
    'pt-BR' : {
        innerText : [
            { key : 'load-image',   value : 'Carregar Imagem' },
            { key : 'save-image',   value : 'Salvar Imagem' },
            { key : 'clear-canvas', value : 'Limpar Tela'},
            { key : 'resolution',   value : 'Mudar Resolução'},
            { key : 'zoom',         value : 'Zoom'},
            { key : 'settings',     value : 'Configurações'},
            { key : 'about',        value : 'Sobre'},
        ],
        titles : [
            { key : 'pointer', value : 'Ponteiro' },
            { key : 'brush', value : 'Pincel' },
            { key : 'pencil', value : 'Lápis' },
            { key : 'line', value : 'Linha' },
            { key : 'square', value : 'Retângulos' },
            { key : 'elipse', value : 'Elipses' },
            { key : 'polygon', value : 'Triângulos' },
            { key : 'text', value : 'Texto' },

            //{ key : 'fill',         value : 'Preencher tela com a imagem'},
        ]
    }
    };
    selectedLanguage;

    /* Constructors ========================================================= */

    constructor() { // When Comp Is Created;
        this.selectedLanguage = navigator.language;
        this.switchLanguage();
    }

    /* Class Methods ======================================================== */

    switchLanguage() {
        this.languages[this.selectedLanguage]['innerText'].forEach(
        (item,index) => {
            document.querySelector("#"+item['key']).innerText = item['value'];
        });

        this.languages[this.selectedLanguage]['titles'].forEach(
        (item,index) => {
            document.querySelector("#"+item['key']).title = item['value'];
        });
    }

}
