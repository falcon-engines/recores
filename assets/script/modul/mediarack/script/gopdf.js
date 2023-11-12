"use strict";

export class gopdfplayer {

    constructor( data, entry ){

        this.target = entry.target.id;
        this.source = data[entry.target.id].source;
        this.thumbs = data[entry.target.id].cover;
        this.titles = data[entry.target.id].title;

        this.bootup();
    }

    bootup() {

        this.render();

        action.addEventListener( 'click', ()=> {
            this.target.querySelector( '.filebox' ).remove();
            this.player();
        }); 
    }

    render() {

        let parent = document.getElementById( entry.target.id );
        let wraper = document.createElement( 'div' );
        let player = document.createElement( 'div' );
        let covers = document.createElement( 'img' );
        let contrl = document.createElement( 'div' );
        let metada = document.createElement( 'div' );
        let titles = document.createElement( 'h2' );
        let descrb = document.createElement( 'p' );
        let action = document.createElement( 'div' );
        let reader = document.createElement( 'button' );
        let downlo = document.createElement( 'a' );

        // parent
        wraper.classList.add( 'filebox' );
        
        // player 
        player.classList.add( 'player', 'grid' );

        //covers
        covers.classList.add( 'covers' );
        covers.src = this.source;

        // control
        contrl.classList.add( 'control' );

        // metadata
        metada.classList.add( 'metadata' );

        // title
        titles.classLista.add( 'title' );
        titles.innerText = this.titles;

        // action wrap
        action.classList.add( 'actions', 'flex', 'align-v' )

        // reader
        reader.classList.add( 'action', 'reader' );
        button.value = 'Read File';

        // download
        downlo.classList.add( 'action', 'download' )
        downlo.innerText = 'Download files';
        downlo.href = this.source;

        
        // builder
        parent.insertBefore( wraper, parent.children[0] );
        wraper.insertBefore( player, wraper.children[0] );
        player.insertBefore( covers, player.children[0] );
        player.insertBefore( contrl, player.children[1] );
        contrl.insertBefore( metada, contrl.children[1] );
        metada.insertBefore( titles, metada.children[0] );
        metada.insertBefore( descrb, metada.children[1] );
        contrl.insertBefore( action, contrl.children[1] );
        action.insertBefore( reader, action.children[0] );
        action.insertBefore( downlo, action.children[1] );
    }


    player() {

    }
}