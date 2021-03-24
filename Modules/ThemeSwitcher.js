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
            key : '--global-background-brightness',
            value : 'blur(30px) brightness(1.4)'
        },
        {
            key : '--global-font-color',
            value : '#333'
        },
        {
            key : '--header-background',
            value : '#FFFFFFC0'
        },
        {
            key : '--program-button-item',
            value : 'transparent'
        },
        {
            key : '--tool-item-background',
            value : '#8888884a'
        },
        {
            key : '--window-header-background',
            value : 'linear-gradient(#eee,#ccc)'
        },
        {
            key : '--tool-option-background',
            value : '#8888884a'
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
            value : '#333'
        },
        {
            key : '--global-background-brightness',
            value : 'blur(30px) brightness(0.4)'
        },
        {
            key : '--global-font-color',
            value : '#fff'
        },
        {
            key : '--header-background',
            value : '#2d2d2dC0'
        },
        {
            key : '--program-button-item',
            value : 'transparent'
        },
        {
            key : '--tool-item-background',
            value : '#0000004a'
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