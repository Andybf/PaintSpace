export default class AVModule {

    static importModuleDefinition(componentElement, componentRoot) {
        let className = AVModule.constructComponentClassName(componentElement);
        import(`${componentRoot}/${className}.js`)
        .then( classDefinition => {
            AVModule.defineCustomComponent(componentElement,classDefinition);
        });
    }

    static constructComponentClassName(componentLocalName) {
        let className = '';
        componentLocalName.localName.replace("mdl-",'').split('-').forEach( word => {
            className += word[0].toUpperCase() + word.slice(1);
        });
        return className;
    }

    static defineCustomComponent(htmlNode, classDefinition) {
        function isComponentNotDefined(classDefinition, node) {
            return classDefinition.default && !window.customElements.get(node.localName);
        }
        if (isComponentNotDefined(classDefinition, htmlNode)) {
            customElements.define(htmlNode.localName, classDefinition.default);
        }
    }
}