"use strict";

import { themebasics } from './core/theme.js';
import { mediainline } from './core/media.js';
import { themesearch } from './page/search.js';
import { audiowafers } from './core/player/wavers.js';

window.addEventListener("load", () => {
    

    // theme features
    new themebasics();

    // media lazyload
    new mediainline( audiowafers );

    // theme searchs
    new themesearch();
   
});


/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */