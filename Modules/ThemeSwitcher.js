/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 10/feb/2021
 * Type: Image Editor
*/

export default class ThemeSwitcher {

    /* Attributes =========================================================== */

    lightTheme = [
        {
            key : '--global-background-color',
            value : '#eee'
        },
        {
            key : '--global-font-color',
            value : '#333'
        },
        {
            key : '--header-background',
            value : 'linear-gradient(#fff,#fff)'
        },
        {
            key : '--program-button-item',
            value : 'transparent'
        },
        {
            key : '--left-toolbox',
            value : 'linear-gradient(#fff,#fff)'
        },
        {
            key : '--tool-item-background',
            value : 'linear-gradient(45deg,#bbbbbb,#f2f2f2)'
        },
        {
            key : '--window-header-background',
            value : 'linear-gradient(#eee,#ccc)'
        },
        {
            key : '--tool-option-background',
            value : '#f1f1f1'
        },
        {
            key : '--tool-option-color',
            value : '#111'
        },
        {
            key : '--window-border-color',
            value : '#ccc'
        },
        {
            key : '--window-background-color',
            value : '#eee'
        },
        {
            key : '--red-button-close',
            value : '#f19999'
        },
        {
            key : '--global-shadow',
            value : '0 0 5px 0px #797979'
        },
    ];
    darkTheme = [
        {
            key : '--global-background-color',
            value : '#111'
        },
        {
            key : '--global-font-color',
            value : '#fff'
        },
        {
            key : '--header-background',
            value : 'linear-gradient(0deg, #202020, #2b2b2b, #202020)'
        },
        {
            key : '--program-button-item',
            value : 'transparent'
        },
        {
            key : '--left-toolbox',
            value : 'linear-gradient(90deg, #1d1d1d, #2d2d2d)'
        },
        {
            key : '--tool-item-background',
            value : 'linear-gradient(45deg,#121212,#393939)'
        },
        {
            key : '--window-header-background',
            value : 'linear-gradient(#555,#333)'
        },
        {
            key : '--tool-option-background',
            value : '#444'
        },
        {
            key : '--tool-option-color',
            value : '#eee'
        },
        {
            key : '--window-border-color',
            value : '#222'
        },
        {
            key : '--window-background-color',
            value : '#222'
        },
        {
            key : '--red-button-close',
            value : '#b65959'
        },
        {
            key : '--global-shadow',
            value : '0 0 5px 0px #000'
        },
    ];
    isDarkMode;

    /* Constructors ========================================================= */

    constructor() { // When Comp Is Created;
        this.isDarkMode = window.matchMedia(
            '(prefers-color-scheme: dark)').matches;
        this.updateThemeState();
    }

    /* Class Methods ======================================================== */

    updateThemeState() {
        if (this.isDarkMode) {
            this.darkTheme.forEach( (prop) => {
                document.documentElement.style.setProperty(
                    prop['key'], prop['value']
                );
            });
        } else {
            this.lightTheme.forEach( (prop) => {
                document.documentElement.style.setProperty(
                    prop['key'], prop['value']
                );
            });
        }
    }
}