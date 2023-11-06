"use strict";



export class mediainline {


    constructor( audiowafers ){

        
        // load audio class
        this.audio_player = audiowafers;


        // validator
        if ( ! document.querySelectorAll( '.media' ) ) {
            return;
        }

        // prototype
        let masters = document.querySelectorAll( '.media' );
        let options = { root: null, rootMargin: '0px' };
        let elmedia = new IntersectionObserver( this.observ.bind(this), options );

        // observers
        masters.forEach( function ( items ) {
            elmedia.observe( items );
        });
    }


    // observ
    observ( entries, observer ) {

        entries.forEach( function ( entry ) {
            if ( entry.isIntersecting ) {
                switch(entry.target.dataset.type) {
                    case 'anima':
                        this.animax(entry);
                        break;
                    case 'audios':
                        this.audios(entry)
                        break;
                    case 'google-doc':
                        this.gogdoc(entry)
                        break;
                    case 'google-pdf':
                        this.gogpdf(entry)
                        break;
                    case 'google-ppt':
                        this.gogppt(entry)
                        break;
                    case 'google-xls':
                        this.gogxls(entry)
                        break;
                    case 'images':
                        this.images(entry)
                        break;
                    case 'docus':
                        this.rawpdf(entry)
                        break;
                    case 'soundcloud':
                        this.scloud(entry)
                        break;
                    case 'vimeo':
                        this.vimeos(entry)
                        break;
                    case 'videos':
                        this.vimeos(entry)
                        break;
                    case 'youtube':
                        this.yutube(entry)
                        break;
                    default:
                        console.log( entry.target.dataset.type+' media type not supported' );
                };
                observer.unobserve(entry.target);
            };
        }.bind(this));
    };


    // script
    script( uniq, link, type, mode ) {

        return new Promise( ( resolve ) => {

            if ( ! document.getElementById( uniq ) ) {

                let parent = document.getElementById( 'base-jsx' );
                let elemen = document.createElement( 'script' );
                if ( uniq ) {
                    elemen.setAttribute( 'id', uniq )
                };  
                if ( link ) {
                    elemen.src = link;
                };
                if ( type ) {
                    elemen.setAttribute( 'type', type );
                }; 
                if ( mode ) {
                    elemen.setAttribute( mode, '' );
                }; 

                parent.after( elemen );
                elemen.onload = () =>{ resolve(); }
            };
        });
    }
 

    // animax
    async animax( data ){
     
        
        await this.script( 'media-anima', 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs', 'module', 'defer' );


        //  prototype
        let render = data.target;
        let player = document.createElement( 'dotlottie-player' );


        // link validator
        if ( player.src === 'no-media' ) {
            return;
        }


        // player builder
        player.src = data.target.dataset.src;
        player.setAttribute( 'class'      , 'loaded' );
        player.setAttribute( 'speed'      , '1' );
        player.setAttribute( 'mode'       , 'normal' );
        player.setAttribute( 'loop'       , '' );
        player.setAttribute( 'autoplay'   , '' );
        player.setAttribute( 'direction'  , '1' );
        player.setAttribute( 'background' , 'transparent' );
        render.insertBefore( player       , render.children[1] );


        // cleansing data
        render.classList.remove( 'media' );


        this.cleaner( render, player );
    }


    // audios 
    async audios( data ){

        await this.script( 'media-audio', 'https://unpkg.com/wavesurfer.js@7', 'module', 'defer' );

        //  prototype
        let render = data.target;
        let wraper = document.createElement( 'div' );
        let bgload = document.createElement( 'img' );
        let player = document.createElement( 'div' );
        let covers = document.createElement( 'img' );
        let equals = document.createElement( 'div' );
        let contrl = document.createElement( 'div' );
        let titles = document.createElement( 'h2' );
        let action = document.createElement( 'div' );
        let starts = document.createElement( 'img' );



        // parent aspect ratio
        render.style.width  = render.offsetWidth+'px';
        render.style.height = ( render.offsetWidth / 16 ) * 9+'px';
        render.classList.add( 'loaded' );
        render.src = render.dataset.cover ;
       
        // background load
        bgload.classList.add( 'd-blur' );
        bgload.src = render.dataset.cover;
       

        // player load
        wraper.classList.add( 'audiobox' );
       

        // cover class
        covers.classList.add( 'covers' );
        covers.src = render.dataset.cover;
        covers.style.height = '260px';
        covers.style.width  = '260px';
        
        // player class
        player.classList.add( 'player' );


        // waver class
        equals.classList.add( 'effect' );


        // control class
        contrl.classList.add( 'control', 'flex', 'align-v' );


        // titles class
        titles.classList.add('fz-120');
        titles.innerText = render.dataset.title; 

        // titles class
        action.classList.add( 'action', 'grid', 'align-a', 'mr-3' );


        // titles class
        starts.src = '/icons/general/play.svg'; 
        starts.classList.add( 'icons' );
        starts.height = 32;
        starts.width = 32;


        // player builds
        render.insertBefore( bgload , player.children[0] );
        render.insertBefore( wraper , render.children[1] );
        wraper.insertBefore( covers , player.children[0] );
        wraper.insertBefore( player , wraper.children[1] );
        player.insertBefore( equals , player.children[1] );
        player.insertBefore( contrl , player.children[0] );
        contrl.insertBefore( titles , contrl.children[0] );
        contrl.insertBefore( action , contrl.children[0] );
        action.insertBefore( starts , action.children[0] );


        // loader players
        new this.audio_player( player, render.dataset.src );

        // loader cleaers
        this.cleaner( render, render );
    }


    // google docs
    gogdoc( data ){
        
    }


    // google pdf
    gogpdf( data ){
        
    }


    // google ppt
    gogppt( data ){
        
    }


    // google xls
    gogxls( data ){
        
    }


    // google pdf
    gogpdf( data ){
        
    }


    // locals img
    images( data ){
        
    }


    // locals pdf 
    rawpdf( data ){
        
    }


    // soundcloud
    scloud( data ){
        
    }


    // vimeo src
    vimeos( data ){
        
    }


    // video src
    videos( data ){
        
    }


    // youtubes
    yutube( data ){
        
    }


    // HELPER


    cleaner( render, player ) {

        let attrib = [ 'data-src', 'data-title', 'data-type', 'data-cover', 'src', 'mode', 'speed', 'direction' ];
        let loader = render.querySelector( '.loader-round' );

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