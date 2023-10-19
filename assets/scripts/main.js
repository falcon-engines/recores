import * as features from './based/feature.js';
import * as lazyload from './based/media.js';

window.addEventListener("load", () => {
    
    // theme dark mode
    features.dark_modes();
    
    // media lazy load
    lazyload.animaxload();
    lazyload.videosload();
});