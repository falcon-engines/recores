"use strict";

export class youtubelite{


    constructor( target, linker ) {
        this.unique = linker;
        this.target = target;
        this.player();
    }


    player() {

        let parent = document.getElementById( this.target.getAttribute( 'id' ) );
        let player = document.createElement( 'div' );
        player.setAttribute( 'id', 'id-'+this.unique );
        parent.appendChild( player );
        this.script( player );
    }


    script( player ) {

        let target = document.getElementById('base-jsx');
        let script = document.createElement('script');
        script.setAttribute( 'id', 'media-youtube' ) ;
        script.src = "https://www.youtube.com/iframe_api";
        target.after( script );

        window.onYouTubeIframeAPIReady = function() {
            
            player = new YT.Player( 'id-'+this.unique , {
                height: this.target.offsetHeight,
                width: this.target.offsetWidth,
                videoId:  this.unique,
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