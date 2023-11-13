"use strict";

export class animaplayer {

    constructor( data, entry ) {
     
        alert('ok');
        //  prototype
        this.target = document.getElementById( entry.target.id );
        this.source = data[entry.target.id].source;
        this.thumbs = data[entry.target.id].cover;
        this.titles = data[entry.target.id].title;

        // init engine
        this.engine();
    }


    script() {

        return new Promise( ( resolve ) => {
             
            let parent = document.getElementById( 'base-jsx' );
            let elemen = document.createElement( 'script' );
            elemen.setAttribute( 'id', 'media-anima' );
            elemen.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
            elemen.setAttribute( 'type', 'module' );
            elemen.setAttribute( 'defer', '' );
            parent.after( elemen );
            elemen.onload = () =>{ resolve(); }
        })
    }


    render() {
        // general variable
        let player = document.createElement( 'dotlottie-player' );

        // player builder
        player.src = this.source;
        player.setAttribute( 'class'      , 'loaded' );
        player.setAttribute( 'speed'      , '1' );
        player.setAttribute( 'mode'       , 'normal' );
        player.setAttribute( 'loop'       , '' );
        player.setAttribute( 'autoplay'   , '' );
        player.setAttribute( 'direction'  , '1' );
        player.setAttribute( 'background' , 'transparent' );
        this.target.insertBefore( player  , this.target.children[1] );
    }


    async engine() {
        await this.script();
        this.render();
    }
}