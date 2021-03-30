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
        this.innerHTML = `
        <span class="line">
            PaintSpace ver. 3.0.2
        </span>
        <span class="line">
            Created by Anderson Bucchianico
        </span>
        <span class="line">
            Licensed under General Public License v3
        </span>
        <span class="line">
            march, 2021
        </span>
        `;
    }

    connectedCallback() { // After Comp Load
    }

    /* Class Methods ======================================================== */


}