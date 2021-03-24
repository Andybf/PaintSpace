/*
 * PaintSpace3
 * Created By: Anderson Bucchianico
 * Date: 23/mar/2021
 * Type: 
*/

export default class About extends HTMLElement{

    /* Attributes =========================================================== */

    title;

    /* Constructors ========================================================= */
        
    constructor() {
        super();
        this.title = 'About';
        this.innerHTML = `<span style="
            display: flex;
            width: fit-content;
            margin: 20px auto;
            height: 20px;
        " >PaintSpace @2021 - by Anderson Bucchianico</span>`;
    }

    connectedCallback() { // After Comp Load
    }

    /* Class Methods ======================================================== */


}