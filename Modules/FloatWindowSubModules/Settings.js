/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 23/mar/2021
 * Type: 
*/

export default class Settings extends HTMLElement {

    /* Attributes =========================================================== */

    title;
    settings
    Objects = [
    ]

    /* Constructors ========================================================= */
        
    constructor() {
        super();
        this.title = 'Settings';
        this.innerHTML = ``;
        this.settings = [
            {
                label : 'Dark Mode',
                type  : 'checkbox',
                defaultValue: true,
                eventType: 'click',
                function: () => {
                    this.Objects[0].isDarkMode = !this.Objects[0].isDarkMode;
                    this.Objects[0].updateThemeState();
                }
            },
            {
                label: 'Language',
                type: 'text',
                defaultValue : 'en-US',
                eventType: 'change',
                function : (event) => {
                    this.Objects[1].selectedLanguage = event.target.value;
                    this.Objects[1].switchLanguage();
                }
            }
        ]
    }

    connectedCallback() {
    }

    init(theme,lang) {
        this.Objects.push(theme);
        this.Objects.push(lang);

        this.settings.forEach( (setting) => {
            let optioncontainer = document.createElement('li');
            optioncontainer.classList.add("option-contianer");

            let label = document.createElement('label');
            label.classList.add("setting-item-label");
            label.innerText = setting.label;
            optioncontainer.appendChild(label);

            let input = document.createElement('input');
            input.classList.add('setting-item-input')
            input.setAttribute('type',setting.type);
            input.value = setting.defaultValue;
            input.addEventListener(setting.eventType, setting.function);
            optioncontainer.appendChild(input);
            this.appendChild(optioncontainer)
        });

    }
    /* Class Methods ======================================================== */


}