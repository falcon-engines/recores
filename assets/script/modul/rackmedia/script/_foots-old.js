"use strict";



class core_render {


    constructor(){

        // validator
        if ( ! document.querySelector( '.media-data' ) ) {
            return;
        }

        // prototype
        this.anima_player = animaplayer;
        this.audio_player = audioplayer;
        this.docus_player = docusplayer;
        this.gdocs_player = gdocsplayer;
        this.gopdf_player = gopdfplayer;
        this.goppt_player = gopptplayer;
        this.goxls_player = goxlsplayer;
        this.image_player = imageplayer;
        this.image_player = imageplayer;
        this.youtube_lite = youtubelite;
        this.video_player = videoplayer;
        this.vimeo_player = vimeoplayer;



        this.media_wraper = document.querySelectorAll( '.media-data' );

        // method
        this.loader();
    }


    // setups
    setups() {

        let result = {};
        this.media_wraper.forEach( item => {
            let datum = item.dataset.unique;
            result[datum] = {
                source : atob( item.dataset.source ),
                format : atob( item.dataset.format ),
                title  : atob( item.dataset.title ),
                cover  : atob( item.dataset.cover ),
            }
            item.remove();
            
        });
        localStorage.removeItem('falcon-media');
        localStorage.setItem('falcon-media', btoa( JSON.stringify( result ) ) );
        return JSON.parse( atob( localStorage.getItem('falcon-media') ) );
    }


    // observ
    async loader() {

        let loadata = await this.setups();
        let masters = document.querySelectorAll( '.onload' );
        let options = { root: null, rootMargin: '0px' };
        let elmedia = new IntersectionObserver( ( entries ) => {

            entries.forEach( ( entry ) => {

                if ( entry.isIntersecting || entry.isInViewport ) {

                    switch( loadata[entry.target.id].format ) {
                        case 'anima':
                            new this.anima_player( data, entry );
                            break;
                        case 'audios':
                            new this.audio_player( loadata, entry );
                            break;
                        case 'docus':
                            new this.docus_player( loadata, entry )
                            break;
                        case 'google-doc':
                            new this.gdocs_player( loadata, entry );
                            break;
                        case 'google-pdf':
                            new this.gopdf_player( loadata, entry );
                            break;
                        case 'google-ppt':
                            new this.goppt_player( loadata, entry );
                            break;
                        case 'google-xls':
                            new this.goxls_player( loadata, entry );
                            break;
                        case 'images':
                            new this.image_player( loadata, entry )
                            break;
                        case 'soundcloud':
                            new this.soudnclouds( loadata, entry )
                            break;
                        case 'vimeo':
                            new this.vimeo_player( loadata, entry )
                            break;
                        case 'videos':
                            new this.video_player( loadata, entry )
                            break;
                        case 'youtube':
                            new this.youtube_lite( loadata, entry )
                            break;
                        default:
                            console.log( entry.target.dataset.type+' media type not supported' );
                    };
                    elmedia.unobserve(entry.target);
                } 
            });
        }, options );

         
        masters.forEach((items) => {
            elmedia.observe(items);
        });
    }


    // HELPER
    cleaner( render, player ) {

        let attrib = [ 'data-src', 'data-title', 'data-type', 'data-cover', 'src', 'mode', 'speed', 'direction' ];
        let loader = render.querySelector( '.loader-round' );

        // remove onload
        render.classList.remove( 'onload' );


        attrib.forEach( attribute => {

            if ( render.hasAttribute( attribute ) ) {
                render.removeAttribute( attribute );
            }

            if ( player.hasAttribute( attribute ) ) {
                player.removeAttribute( attribute );
            }

        });

        loader.remove();
    }


    
    loaders_old( entries, observer ) {

        let render = document.createElement( 'iframe' );
       
        entries.forEach(( entry ) => {
          
            let target = entry.target;
            let format = target.dataset.type;
            let loader = target.querySelector('.loader-round');
            
            let lazy_anim = () => {
                let mainjs = document.getElementById( 'base-jsx' );
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
                render.setAttribute( 'alt', target.dataset.alt );
                render.setAttribute( 'width', content_width );
                render.setAttribute( 'height', Math.round((content_width/16)*9) );
                // avoid lazy loading images that are in the first visible viewport
                if ( entry.isInViewport == false  ) {
                    render.setAttribute( 'loading', 'lazy' );
                }
                render.src = target.dataset.src;
                target.insertBefore( render, target.children[20] );

                render.addEventListener('load', ( event ) => {
                    event.currentTarget.classList.add( 'loaded' );
                    loader.classList.add( 'hide' );
                });
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
                    render.src = target.dataset.src;
                    lazy_vide( target, render, loader );
                }
                else if ( format === 'image' ) {
                    render = document.createElement( 'img' );
                    lazy_imgs( target, render, loader );
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
                else if ( format === 'animax' ) {
                    lazy_anim( target, render );
                }
                else {
                    
                }
                observer.unobserve(target);
            }
        });
    }
}


/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */