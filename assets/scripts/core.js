"use strict";

import { themebasics } from './core/basics.js';
import { mediainline } from './core/render.js';
import { animaplayer } from './core/render/anima.js';
import { audioplayer } from './core/render/audio.js';
import { docusplayer } from './core/render/docus.js';
import { gdocsplayer } from './core/render/godoc.js';
import { gopdfplayer } from './core/render/gopdf.js';
import { gopptplayer } from './core/render/goppt.js';
import { goxlsplayer } from './core/render/goxls.js';
import { imageplayer } from './core/render/image.js';
import { youtubelite } from './core/render/tubes.js';
import { videoplayer } from './core/render/video.js';
import { vimeoplayer } from './core/render/vimeo.js';
import { soudnclouds } from './core/render/scloud.js';
import { themesearch } from './page/search.js';


window.addEventListener("load", () => {
    
    // theme features
    new themebasics();

    // media lazyload
    new mediainline( animaplayer, audioplayer, docusplayer, gdocsplayer, gopdfplayer, gopptplayer, goxlsplayer, imageplayer, soudnclouds, youtubelite, videoplayer, vimeoplayer );

    // theme searchs
    new themesearch();
   
});


/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */