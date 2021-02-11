/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 10/feb/2021
 * Type: Image Editor
*/

export default class ThemeSwitcher {

    /* Attributes =========================================================== */

    isDarkMode;

    /* Constructors ========================================================= */

    constructor() { // When Comp Is Created;
        this.isDarkMode = window.matchMedia(
            '(prefers-color-scheme: dark)').matches;
        this.updateThemeState();
    }

    /* Class Methods ======================================================== */

    updateThemeState() {
        function switchDarkMode() {
            let cssProperties = document.documentElement.style;
            cssProperties.setProperty("--global-background-color","#111");
            cssProperties.setProperty("--global-font-color","#fff");
            cssProperties.setProperty(
                "--header-background",
                "linear-gradient(0deg, #202020, #2b2b2b, #202020)"
            );
            cssProperties.setProperty( "--tool-option-background", "#111" );
            cssProperties.setProperty(
                "--left-toolbox",
                "linear-gradient(90deg, #1d1d1d, #2d2d2d)"
            );
            cssProperties.setProperty(
                "--tool-item-background",
                "linear-gradient(45deg,#1c1c1c,#373737)"
            );
            cssProperties.setProperty(
                "--window-header-background",
                "linear-gradient(#555,#333)"
            );
            cssProperties.setProperty(
                "--window-border-color",
                "#333"
            );
            cssProperties.setProperty(
                "--window-background-color",
                "#222"
            );
            cssProperties.setProperty(
                "--red-button-close",
                "#b65959"
            );
            cssProperties.setProperty(
                "--global-shadow",
                "0 0 5px 0px #000"
            );
        }
    
        function switchLightMode() {
            let cssProperties = document.documentElement.style;
            cssProperties.setProperty("--global-background-color","#eee");
            cssProperties.setProperty("--global-font-color","#333");
            cssProperties.setProperty(
                "--header-background",
                "linear-gradient(#fff,#fff)"
                );
            cssProperties.setProperty(
                "--left-toolbox",
                "linear-gradient(#fff,#fff)"
            );
            cssProperties.setProperty(
                "--tool-item-background",
                "linear-gradient(45deg,#ddd,#fff)"
            );
            cssProperties.setProperty(
                "--window-header-background",
                "linear-gradient(#eee,#ccc)"
            );
            cssProperties.setProperty( "--tool-option-background", "#f1f1f1" );
            cssProperties.setProperty(
                "--window-border-color",
                "#ccc"
            );
            cssProperties.setProperty(
                "--window-background-color",
                "#eee"
            );
            cssProperties.setProperty(
                "--red-button-close",
                "#f19999"
            );
            cssProperties.setProperty(
                "--global-shadow",
                "0 0 5px 0px #797979"
            );
        }

        if (this.isDarkMode) {
            switchDarkMode()
            this.isDarkMode = false;
        } else {
            switchLightMode();
            this.isDarkMode = true;
        }
    }

}