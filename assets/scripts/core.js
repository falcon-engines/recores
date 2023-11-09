"use strict";

import { themebasics } from './core/theme.js';
import { mediainline } from './core/media.js';
import { animaplayer } from './core/media/anima.js';
import { audioplayer } from './core/media/audio.js';
import { docusplayer } from './core/media/docus.js';
import { gdocsplayer } from './core/media/godoc.js';
import { gopdfplayer } from './core/media/gopdf.js';
import { gopptplayer } from './core/media/goppt.js';
import { goxlsplayer } from './core/media/goxls.js';
import { imageplayer } from './core/media/image.js';
import { youtubelite } from './core/media/tubes.js';
import { videoplayer } from './core/media/video.js';
import { vimeoplayer } from './core/media/vimeo.js';
import { soudnclouds } from './core/media/scloud.js';
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