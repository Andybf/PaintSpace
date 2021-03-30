/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 23/mar/2021
 * Type: 
*/

export default class Settings extends HTMLElement {

    /* Attributes =========================================================== */

    title;
    settings;
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
                label : 'Dynamic Background',
                type  : 'checkbox',
                defaultValue: true,
                eventType: 'click',
                function: () => {
                    this.Objects[2].dynamicBgdActive = !this.Objects[2].dynamicBgdActive;
                    this.Objects[2].updateBackground();
                }
            },
            {
                label: 'Language',
                type: 'picklist',
                optionList : ['en-US','pt-BR'],
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

    init(theme,lang,canvas) {
        this.Objects.push(theme);
        this.Objects.push(lang);
        this.Objects.push(canvas);

        this.settings.forEach( (setting) => {
            let optioncontainer = document.createElement('li');
            optioncontainer.classList.add("option-contianer");

            let label = document.createElement('label');
            label.classList.add("setting-item-label");
            label.innerText = setting.label;
            optioncontainer.appendChild(label);

            let element;
            if (setting.type == 'picklist') {
                element = this.createPicklist(setting);
            } else {
                element = this.createInput(setting);
            }
            optioncontainer.appendChild(element);
            this.appendChild(optioncontainer);
        });

    }
    /* Class Methods ======================================================== */

    createInput(setting) {
        let input = document.createElement('input');
        input.classList.add('setting-item-input');
        input.setAttribute('type',setting.type);
        
        if (setting.type == 'checkbox') {
            input.checked = setting.defaultValue;
        } else {
            input.value = setting.defaultValue;
        }
        input.addEventListener(setting.eventType, setting.function);
        return input;
    }

    createPicklist(setting) {
        let select = document.createElement('select');
        select.classList.add('setting-item-picklist');
        setting.optionList.forEach( (item) => {
            let option = document.createElement('option');
            option.value = item;
            option.innerText = item;
            select.appendChild(option);
        });
        select.addEventListener(setting.eventType, setting.function);
        return select;
    }
}