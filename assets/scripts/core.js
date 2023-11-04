"use strict";

import { themebasics } from './core/theme.js';
import { medialoader } from './core/media.js';
import { searchmodel } from './page/search.js';

window.addEventListener("load", () => {
    
    // theme features
    new themebasics();

    // media lazyload
    new medialoader();

    // theme searchs
    new searchmodel('index.json');
   
});


/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */