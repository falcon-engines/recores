"use strict";

import { themebasics } from './core/theme.js';
import { mediainline } from './core/media.js';
import { animaplayer } from './core/media/anima.js';
import { audioplayer } from './core/media/audio.js';
import { youtubelite } from './core/media/tubes.js';
import { themesearch } from './page/search.js';


window.addEventListener("load", () => {
    
    // theme features
    new themebasics();

    // media lazyload
    new mediainline( animaplayer, audioplayer, youtubelite );

    // theme searchs
    new themesearch();
   
});


/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */