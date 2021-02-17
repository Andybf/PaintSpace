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
        ],
        titles : [
            { key : 'pointer', value : 'Pointer' },
            { key : 'brush', value : 'Brush' },
            { key : 'pencil', value : 'Pencil' },
            { key : 'line', value : 'Line' },
            { key : 'square', value : 'Rect' },
            { key : 'circle', value : 'Elipses' },
            { key : 'triangle', value : 'Triangles' },
            { key : 'text', value : 'Text' },
            { key : 'color-picker', value : 'Color Picker' },
            { key : 'eraser', value : 'Eraser' },
        ]
    },
    'pt-BR' : {
        innerText : [
            { key : 'load-image',   value : 'Carregar Imagem' },
            { key : 'save-image',   value : 'Salvar Imagem' },
            { key : 'clear-canvas', value : 'Limpar Canvas'},
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
            { key : 'circle', value : 'Elipses' },
            { key : 'triangle', value : 'Triângulos' },
            { key : 'text', value : 'Texto' },
            { key : 'color-picker', value : 'Seletor de Cor' },
            { key : 'eraser', value : 'Borracha' },
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
