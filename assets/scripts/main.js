import { themebasics } from './based/theme.js';
import { medialoader } from './based/media.js';

window.addEventListener("load", () => {
    
    // theme features
    new themebasics();

    // media lazyload
    new medialoader();
});

