"use strict";


// media_rack model
class media_rack {

    #page_data_media = {}


    constructor(){
        

        console.log( 'Mediarack main class loaded.' );

        // validator
        if ( ! document.querySelector( 'rack-data' ) ) {
            return;
        }

        


        // debugger
        this.debugger();


        this.media_wraper = document.querySelectorAll( 'rack-data' );

        // method
        this.init_data();
    }


    // get data from all media-rack element and saved at localstorage 
    init_data() {

        this.media_wraper.forEach( entry => {
            let format = entry.dataset.format 
            switch( format ) {
                case 'anima':
                    this.data_anima( entry );
                    break;
                case 'audios':
                    this.data_audio( entry );
                    break;
                case 'docus':
                    this.data_docus( entry )
                    break;
                case 'google-doc':
                    this.data_gdocs( entry );
                    break;
                case 'google-pdf':
                    this.data_gopdf( entry );
                    break;
                case 'google-ppt':
                    this.data_goppt( entry );
                    break;
                case 'google-xls':
                    this.data_goxls( entry );
                    break;
                case 'images':
                    this.data_image( entry );
                    break;
                case 'soundcloud':
                    this.data_sclod( entry );
                    break;
                case 'videos':
                    this.data_video( entry );
                    break;
                case 'vimeo':
                    this.data_vimeo( entry );
                    break;
                case 'youtube':
                    this.data_ytube( entry );
                    break;
                default:
                    console.log( entry.dataset.format+' media type not supported' );
            };
            item.remove();
        });


        localStorage.removeItem('falcon-media');
        localStorage.setItem('falcon-media', btoa( JSON.stringify( result ) ) );
        return JSON.parse( atob( localStorage.getItem('falcon-media') ) );
    }


    data_anima( entry ) {

        let datum = entry.dataset.unique;
    }

    data_audio( entry ) {
        let datum = entry.dataset.unique;
    }

    data_docus( entry ) {
        let datum = entry.dataset.unique;
    }

    data_godoc( entry ) {
        let datum = entry.dataset.unique;
    }

    data_gopdf( entry ) {
        let datum = entry.dataset.unique;
    }

    data_goppt( entry ) {
        let datum = entry.dataset.unique;
    }

    data_goxls( entry ) {
        let datum = entry.dataset.unique;
    }

    data_image( entry ) {
        let datum = entry.dataset.unique;
    }

    data_sclod( entry ) {
        let datum = entry.dataset.unique;
    }

    data_video( entry ) {
        let datum = entry.dataset.unique;
    }

    data_vimeo( entry ) {
        let datum = entry.dataset.unique;
    }

    data_ytube( entry ) {
        let datum = entry.dataset.unique;
    }

    

    debugger() {

        // debugger
        if ( document.querySelector("meta[property='staging-environment']") == 'development' ) {
            console.log( 'Mediarack main class loaded.' );
        }
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


// init media_rack
(()=>{
    window.addEventListener('load', ()=> { new media_rack; });
})();


/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */