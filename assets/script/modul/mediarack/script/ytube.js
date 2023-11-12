"use strict";

export class youtubelite{

    
    constructor( data, entry ) {
        this.target = document.getElementById( entry.target.id );
        this.source = data[entry.target.id].source.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();;
        this.thumbs = data[entry.target.id].cover;
        this.titles = data[entry.target.id].title;
        this.bootup();
    }


    bootup() {
        let action = this.render();
        action.addEventListener( 'click', ()=> {
            this.target.querySelector( '.coverbox' ).remove();
            let render = this.corest();
            this.player( render );
        });
    }


    render() {

        let wraper = document.createElement( 'div' );
        let bgload = document.createElement( 'img' );
        let action = document.createElement( 'div' );
        let starts = document.createElement( 'img' );


        // parent
        this.target.classList.add( 'youtubelite' );
        this.target.classList.add( 'loaded' );


        // wrapper
        wraper.classList.add( 'coverbox' );


        // covers
        if (  this.source && this.target.offsetWidth <= 320 ) {
            this.thumbs = 'https://img.youtube.com/vi/'+this.source +'/mqdefault.jpg'
        }
        else if (  this.source && this.target.offsetWidth < 480 ) {
            this.thumbs = 'https://img.youtube.com/vi/'+this.source +'/hqdefault.jpg'
        } 
        else if (  this.source && this.target.offsetWidth >= 480 ) {
            this.thumbs = 'https://img.youtube.com/vi/'+this.source +'/maxresdefault.jpg'
        } 
        bgload.src    = this.thumbs;
        bgload.alt    = this.titles+'  video image cover.';
        bgload.width  = this.target.offsetWidth;
        bgload.height = ( this.target.offsetWidth / 4 ) * 3;
        bgload.classList.add('cover');


        // actions
        action.classList.add( 'action', 'grid', 'align-a', 'round-10' );
        starts.classList.add( 'icons' );
        starts.src    = '/icons/general/play.svg'; 
        starts.alt    = 'youtube play action  video image cover.';
        starts.height = 32;
        starts.width  = 48;

      
        this.target.insertBefore( wraper , this.target.children[0] );
        wraper.insertBefore( bgload , wraper.children[0] );
        wraper.insertBefore( action , wraper.children[1] );
        action.insertBefore( starts , action.children[0] );


        // cleaner action
        this.target.querySelector( '.loader-round' ).remove();
        this.target.classList.remove( 'onload' );


        return action;
    }


    corest() {

        // get youtube iframe api
        let target = document.getElementById('base-jsx');
        let script = document.createElement('script');
        script.setAttribute( 'id', 'media-youtube' ) ;
        script.src = "https://www.youtube.com/iframe_api";
        target.after( script );

        // create youtube element
        let player = document.createElement( 'div' );
        player.setAttribute( 'id', 'id-'+this.source );
        this.target.appendChild( player );
        return player;
    }


    player() {

        window.onYouTubeIframeAPIReady = function() {
            
            player = new YT.Player( 'id-'+this.source , {
                height: this.target.offsetHeight,
                width:  this.target.offsetWidth,
                videoId:  this.source,
                playerVars: {
                    autoplay: 1,                                // auto play
                    controls: 1,                                // show controls
                    modestbranding: 0,                          // youtube logo
                    loop: 1,                                    // loop video
                    // fs: 0,                                   // frame per second
                    // cc_load_policty: 0,                      // cc load policy
                    // iv_load_policy: 3,                       // iv load policy
                    autohide: 0,                                // auto hide
                    mute: 0,                                    // mute audio play
                    // playsinline: 1,                          // inline playlist
                    // playlist: 'JjWqkhvXVKA,JjWqkhvXVKA',     // video id for playlist
                    // playlist: 'CgRHuvKD8zg',                 // id audio for fisrt playlist
                },
                events: {
                    'onReady': this.ready,                      // ready callback function
                    // 'onStateChange': onPlayerStateChange     // change callback function
                },
            });
        }.bind(this);
    }

   
    ready ( event ) {
        event.target.setVolume( 80 );
		event.target.playVideo();
    }
}

/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */