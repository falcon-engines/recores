export class medialoader {

    constructor(){
        let pagechecks = document.querySelector('.media');
        if ( pagechecks ) {
            this.lazy_load();
        } 
    }

    // animation 
    animation() {
        let mainjs = document.getElementById( 'page-jsx' );
        let gensrc = document.createElement( 'script' );
        gensrc.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
        gensrc.setAttribute( 'type', 'module');
        gensrc.setAttribute( 'defer', '');
        mainjs.after( gensrc );
    }

    // lazyloads 
    lazy_load() {
        let masters = document.querySelectorAll( '.media' );
        let options = { root: null, rootMargin: '0px' };
        let observe = new IntersectionObserver( this.lazy_main, options );
        masters.forEach((items) => {
            observe.observe(items);
        });
    }

    lazy_main( entries, observer ) {

        let render = document.createElement( 'iframe' );
       
        entries.forEach(( entry ) => {
          
            let target = entry.target;
            let format = target.dataset.type;
            let loader = target.querySelector('.loader-round');
            
            let lazy_anim = ( target, render ) => {
                let mainjs = document.getElementById( 'page-jsx' );
                let gensrc = document.createElement( 'script' );
                gensrc.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
                gensrc.setAttribute( 'type', 'module');
                gensrc.setAttribute( 'defer', '');
                mainjs.after( gensrc );
            }

            let lazy_gppt = ( target, render ) => {
                render.setAttribute( 'frameborder', 0 );
                render.setAttribute( 'mozallowfullscreen', true );
                render.setAttribute( 'allowfullscreen', true );
                target.insertBefore( render, target.children[0] );
            }
           
            let lazy_vide = ( target, render, loader ) => {
                // element builder 
                render.setAttribute( 'controls', '' );
                render.setAttribute( 'controlsList', 'noplaybackrate nodownload' );
                render.setAttribute( 'poster', target.dataset.cover );
                target.insertBefore( render, target.children[0] );
                // close animation
                render.addEventListener('canplaythrough', ( event ) => {
                    event.currentTarget.classList.add( 'loaded' );
                    setTimeout( () => {
                        loader.classList.add( 'hide' );
                    }, 1000);
                });
            }
        
            let lazy_ytub = ( target, render ) => {
                render.setAttribute( 'frameborder', 0 );
                render.setAttribute( 'loading', 'lazy' );
                render.setAttribute( 'allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' );
                render.setAttribute( 'allowfullscreen', '' );
                target.insertBefore( render, render.children[0] );
            }

            let lazy_imgs = ( target, render ) => {
                let content_width = target.clientWidth;
                render.setAttribute( 'alt', target.dataset.title );
                render.setAttribute( 'width', content_width );
                render.setAttribute( 'height', Math.round((content_width/16)*9) );
                // avoid lazy loading images that are in the first visible viewport
                if ( entry.isInViewport == false  ) {
                    render.setAttribute( 'loading', 'lazy' );
                }
                render.src = target.dataset.src;
                target.insertBefore( render, target.children[20] );
            }

            let lazy_kill = ( render, loader ) => {
                render.addEventListener('load', ( event ) => {
                    event.currentTarget.classList.add( 'loaded' );
                    loader.classList.add( 'hide' );
                });
            }

            if ( entry.isIntersecting || entry.isInViewport ) {
                if ( format === 'video' ) {
                    render = document.createElement( 'video' );
                   
                    lazy_vide( target, render, loader );
                }
                else if ( format === 'image' ) {
                    render = document.createElement( 'img' );
                    lazy_imgs( target, render, loader );
                    lazy_kill( render, loader );
                }
                else if ( format === 'file' || format === 'vimeo' || format === 'gdoc' || format === 'gxls' || format === 'gpdf' ) {
                    render.src = target.dataset.src;
                    render.setAttribute( 'title', target.dataset.title );
                    target.insertBefore(render, target.children[0]);
                    lazy_kill( render, loader );
                }
                else if ( format === 'gppt' ) {
                    render.src = target.dataset.src;
                    lazy_gppt( target, render );
                    lazy_kill( render, loader );
                    
                }
                else if ( format === 'youtube' ) {
                    render.src = target.dataset.src;
                    lazy_ytub( target, render );
                    lazy_kill( render, loader );
                }
                else if ( format === 'anima' ) {
                    lazy_anim( target, render );
                }
                else {
                    
                }
                
                observer.unobserve(target);
            }
        });

    }
}