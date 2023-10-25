import { themebasics } from './core/theme.js';
import { medialoader } from './core/media.js';

window.addEventListener("load", () => {
    
    // theme features
    new themebasics();

    // media lazyload
    new medialoader();
});