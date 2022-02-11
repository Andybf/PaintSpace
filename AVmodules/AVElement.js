/* 
 * AndView Framework
 * Copyright © 2021 Anderson Bucchianico. All rights reserved.
*/

export default class AVElement extends HTMLElement {

    #compPaths;
    #compChildrens = [];
    #compParents = [];
    localization;
    
    constructor() {
        super();
        this.#initializeComponent();
    }

    /* private methods ====================================================== */

    async #initializeComponent() {
        this.#doPreLoadContentActions();
        await this.#appendHTMLtoComponentBody();
        await this.#appendCSStoComponentBody();
        this.#doPostLoadContentActions();
    }

    #doPreLoadContentActions() {
        this.#catalogParentComponents(this.parentNode);
        this.#catalogComponentPaths();
    }

    #doPostLoadContentActions() {
        this.#catalogChildrenComponents();
        this.#initializeAllChildrenComponents();
        this.localization && this.#translateComponentText();
        this.renderedCallback();
    }

    #catalogParentComponents(parentNode) {
        let nextParentNode = parentNode;
        if (nextParentNode.host) {
            this.#compParents.push(nextParentNode.host);
            this.#catalogParentComponents(nextParentNode.host);
        } else if (nextParentNode.localName.includes("html")) {
            return false;
        } else {
            this.#catalogParentComponents(nextParentNode.parentNode);
        }
    }

    #catalogComponentPaths() {
        let root = this.#mountComponentRootPath();
        this.#compPaths = {
            root : `${root}${this.constructor.name}`,
            html : `${root}${this.constructor.name}/${this.constructor.name}.html`,
            css  : `${root}${this.constructor.name}/${this.constructor.name}.css`,
            js   : `${root}${this.constructor.name}/${this.constructor.name}.js`,
        }
    }

    #mountComponentRootPath() {
        let root = window.location.pathname;
        let copiedCompParents = this.#compParents.slice(0);
        for(let x=this.#compParents.length; x>0; x--) {
            root += `${this.#getComponentClassName(copiedCompParents.pop().localName)}/`
        }
        return root;
    }

    async #appendHTMLtoComponentBody() {
        await this.#fetchContentWithPath(this.#compPaths.html).then( (responseText) => {
            let componentHTML = new DOMParser().parseFromString(responseText,"text/html");
            this.body = this.attachShadow({mode:'closed'});
            Array.from(componentHTML.querySelector("body").childNodes).forEach( node => {
                this.body.appendChild(node);
            })
        });
    }

    async #appendCSStoComponentBody() {
        function removeCommentsAndBreakLines(cssText){
            return cssText.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').replaceAll('\n','');
        }
        await this.#fetchContentWithPath(this.#compPaths.css).then( cssText => {
            let styleNode = document.createElement("style");
            styleNode.innerText = removeCommentsAndBreakLines(cssText);
            this.body.appendChild(styleNode);
        });
    }

    async #fetchContentWithPath(path) {
        let response = await fetch(path);
        return (response.statusText == 'OK') ? await response.text() : '';
    }

    #catalogChildrenComponents() {
        this.body.querySelectorAll("*").forEach( componentNode => {
            if (componentNode.tagName.includes("COMP-")){
                this.#compChildrens.push(componentNode);
            }
        })
    }

    #initializeAllChildrenComponents() {
        this.#compChildrens.forEach( componentNode => {
            this.#initializeChildrenComponent(componentNode);
        })
    }

    #getComponentClassName(componentLocalName) {
        let className = '';
        componentLocalName.replace("comp-",'').split('-').forEach( word => {
            className += word[0].toUpperCase()+word.slice(1);
        });
        return className;
    }

    #initializeChildrenComponent(htmlNode) {
        let className = this.#getComponentClassName(htmlNode.localName);
        import(`${this.#compPaths.root}/${className}/${className}.js`)
        .then( classDefinition => {
            this.#defineCustomComponent(htmlNode.localName,classDefinition);
        });
    }

    #defineCustomComponent(htmlNodeLocalName,classDefinition) {
        if (classDefinition.default) {
            customElements.define(htmlNodeLocalName,classDefinition.default);
        }
    }

    #translateComponentText() {
        try {
            if (this.localization) {
                if (this.localization['innerText']) {
                    this.localization['innerText'][navigator.language].forEach( (item,index) => {
                        this.body.querySelector("#"+item['key']).innerText = item['value'];
                    });
                }
                if (this.localization['title']) {
                    this.localization['title'][navigator.language].forEach( (item,index) => {
                        this.body.querySelector("#"+item['key']).title = item['value'];
                    });
                }
            } else {
                console.warn(
                    "[AV] no translation found for browser language. Component:",
                    this.constructor.name
                );
            }
        } catch(e) {
            console.warn(
                "[AV] error when translating component:",
                this.constructor.name
            );
        }
    }

    /* public methods ======================================================= */

    getParentComponents() {
        return this.#compParents;
    }

    getChildenComponents() {
        return this.#compChildrens;
    }

    /* abstract methods ===================================================== */

    renderedCallback(){}
}