import { themebasics } from './main/theme.js';
import { medialoader } from './main/media.js';

window.addEventListener("load", () => {
    
    // theme features
    new themebasics();

    // media lazyload
    new medialoader();
});

