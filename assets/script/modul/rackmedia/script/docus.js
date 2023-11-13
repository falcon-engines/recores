"use strict";

export class docusplayer {


    constructor( data, entry ){

        this.target = entry.target.id;
        this.source = data[entry.target.id].source;
        this.thumbs = data[entry.target.id].cover;
        this.titles = data[entry.target.id].title;

        this.bootup();
    }

    
    bootup() {
        let actions = this.render();
        this.player( actions );
    }


    render() {

        let parent = document.getElementById( this.target );
        let bgload = document.createElement( 'img' );
        let wraper = document.createElement( 'div' );
        let covers = document.createElement( 'img' );
        let contrl = document.createElement( 'div' );
        let metada = document.createElement( 'div' );
        let titles = document.createElement( 'h2' );
        let descrb = document.createElement( 'p' );
        let action = document.createElement( 'div' );
        let reader = document.createElement( 'button' );
        let downlo = document.createElement( 'button' );

        // parent
        wraper.classList.add( 'google-file', 'boxed', 'grid');
        
        // bgload
        bgload.classList.add( 'bg-asset', 'd-blur' );
        bgload.src = this.thumbs;
        bgload.alt = 'File document background.'

        //covers
        covers.classList.add( 'covers', 'orientation-v' );
        covers.src = this.thumbs;
        covers.alt = 'Document cover.'

        // control
        contrl.classList.add( 'control' );

        // metadata
        metada.classList.add( 'metadata' );

        // title
        titles.classList.add( 'title' );
        titles.innerText = this.titles;

        // action wrap
        action.classList.add( 'actions', 'flex' );

        // reader
        reader.classList.add( 'action', 'reader', 'btn', 'btn-primary' );
        reader.innerText = 'Read file';
        reader.value = 'read-file';

        // download
        downlo.classList.add( 'action', 'download', 'btn', 'btn-primary' )
        downlo.innerText = 'Download file';
        downlo.value = 'download-file';

        // builder
        parent.insertBefore( wraper, parent.children[0] );
        parent.insertBefore( bgload, parent.children[1] );
        wraper.insertBefore( covers, wraper.children[0] );
        wraper.insertBefore( contrl, wraper.children[1] );
        contrl.insertBefore( metada, contrl.children[1] );
        metada.insertBefore( titles, metada.children[0] );
        metada.insertBefore( descrb, metada.children[1] );
        contrl.insertBefore( action, contrl.children[1] );
        action.insertBefore( reader, action.children[0] );
        action.insertBefore( downlo, action.children[1] );

        // remove loader
        parent.querySelector( '.loader-round' ).remove();
        parent.classList.remove( 'onload' );
        parent.classList.add( 'loaded' );

        // return action
        return Array.prototype.slice.call( [ reader, downlo ] );
    }


    player( actions ) {
        actions.forEach( item => {
            item.addEventListener( 'click', (event) => {
                let action_type = event.currentTarget.value;
                if ( action_type === 'download-file' ) {
                    this.downlo();
                }
                else {
                    this.reader();
                }
            });
        });
    }


    downlo() {
        let link = document.createElement("a");
        link.href = this.source;
        link.download = this.titles;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    reader() {
       
        let bodies = document.getElementsByTagName("BODY")[0];
        let parent = document.getElementById( this.target );
        let modals = document.createElement( 'div' );
        let closed = document.createElement( 'button' );
        let render = document.createElement( 'iframe' );

        // modals wraps
        modals.classList.add( 'modals' );

        // close
        closed.innerText = 'Close Reader'
        closed.classList.add( 'close', 'btn', 'btn-primary' );

        // iframe build
        render.title =  this.title;
        render.classList.add( 'fluid' );
        render.src = this.source;

        // build reader
        parent.insertBefore( modals, parent.children[0] );
        modals.insertBefore( closed, modals.children[0] );
        modals.insertBefore( render, modals.children[0] );


        // add no scroll class to body
        bodies.classList.add( 'noscroll' );

        // destroy element when closed
        closed.addEventListener( 'click', () => {
            bodies.classList.remove( 'noscroll' );
            modals.remove();
        });
    }
}