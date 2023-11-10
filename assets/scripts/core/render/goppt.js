"use strict";

export class gopptplayer {

    constructor( data, entry ){

        this.target = entry.target.id;
        this.source = data[entry.target.id].source;
        this.thumbs = data[entry.target.id].cover;
        this.titles = data[entry.target.id].title;

        this.bootup();
    }

    bootup() {
        let action = this.render();
        action.addEventListener( 'click', ()=> {
            this.player();
        }); 
    }

    render() {
        
    }


    player() {

    }
}