/* 
 * AndView Framework
 * Copyright © 2022 Anderson Bucchianico. All rights reserved.
 * 
*/

export default class AVutils {
    
    static mapPopValue(map) {
        let value = Array.from(map)[map.size-1][1];
        map.delete(Array.from(map)[map.size-1][0])
        return value;
    }

    static concatMaps(map1, map2) {
        const iterationCount = (map1.size > map2.size) ? map1.size : map2.size;
        for (let index=0; index<iterationCount; index++) {
            map1.set(Array.from(map2)[index][0], {localName : Array.from(map2)[index][1].localName});
        }
    }

    static translateComponentText(localization, component) {
        try {
            if (localization) {
                if (localization['innerText']) {
                    localization['innerText'][navigator.language].forEach( (item,index) => {
                        component.body.querySelector("#"+item['key']).innerText = item['value'];
                    });
                }
                if (localization['title']) {
                    localization['title'][navigator.language].forEach( (item,index) => {
                        component.body.querySelector("#"+item['key']).title = item['value'];
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
}