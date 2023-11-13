"use strict";

export class audioplayer {
    

    constructor( data, entry ){

        this.target = entry.target.id;
        this.source = data[entry.target.id].source;
        this.thumbs = data[entry.target.id].cover;
        this.titles = data[entry.target.id].title;

        this.bootup();
    }


    script() {
        return new Promise( ( resolve ) => {
            resolve();
        });
    }


    bootup() {

        // await this.script();
        this.parent = this.render();
        this.player();
    }


    render() {

        // protype
        let parent = document.getElementById( this.target );
        let bgload = document.createElement( 'img' );
        let player = document.createElement( 'div' );
        let button = document.createElement( 'div' );
        let covers = document.createElement( 'img' );
        let equalz = document.createElement( 'canvas' );
        let contrl = document.createElement( 'div' );
        let titles = document.createElement( 'h2' );
        let action = document.createElement( 'div' );
        let iconic = document.createElement( 'img' );


        // parent attribute
        parent.style.width  = parent.offsetWidth+'px';
        parent.style.height = ( parent.offsetWidth / 16 ) * 9+'px';


        // background attribute
        bgload.classList.add( 'd-blur', 'bg-asset' );
        bgload.src = this.thumbs;
        bgload.alt = 'Audio track background images.';


        // player attribute
        player.classList.add( 'audiobox', 'boxed' );


        // cover attribute
        covers.classList.add( 'covers' );
        covers.src = this.thumbs;
        covers.height = 260;
        covers.width  = 260;
        covers.alt = 'Audio cover  images.';


        // control attribute
        contrl.classList.add( 'control' );


        // equalizer attribute
        equalz.classList.add( 'equalizer' );


        // action attribute
        action.classList.add( 'flex', 'align-v' );


        // titles attribute
        titles.classList.add('fz-120');
        titles.innerText = this.titles; 


        // button class
        button.classList.add( 'action', 'grid', 'align-a', 'mr-3' );


        // icons class
        iconic.src = '/icons/general/play.svg'; 
        iconic.classList.add( 'icons' );
        iconic.height = 32;
        iconic.width = 32;
        iconic.alt = 'Audip play and pause button.';


        // player builds
        parent.insertBefore( bgload, parent.children[0] );
        parent.insertBefore( player, parent.children[1] );
        player.insertBefore( covers, player.children[0] );
        player.insertBefore( contrl, player.children[1] );
        contrl.insertBefore( action, contrl.children[0] );
        contrl.insertBefore( equalz, contrl.children[1] );
        action.insertBefore( titles, action.children[1] );
        action.insertBefore( button, action.children[0] );
        button.insertBefore( iconic , button.children[0] );


        // clean loader
        parent.querySelector( '.loader-round' ).remove();
        parent.classList.remove( 'onload' );
        parent.classList.add( 'loaded' );
        return parent;
    }


    engine( audio_contex ) {
        
        let audio_source;
        let audio_canvas = this.parent.querySelector( '.equalizer' );
       
        // fetch audio data
        fetch( this.source )
        .then(( response )  => response.arrayBuffer())
        .then( audio_buffer => audio_contex.decodeAudioData( audio_buffer) )
        .then( decode_audio => {
            audio_source = audio_contex.createBufferSource();     // creates a sound source
            audio_source.buffer = decode_audio;                   // tell the source which sound to play
            audio_source.connect( audio_analis );
            audio_source.connect( audio_contex.destination );     // connect the source to the context's destination (the speakers)
            audio_source.start();
        })


        // prepare canvas
        let canvas_draws     = audio_canvas.getContext("2d");
        audio_canvas.width   = window.innerWidth;
        audio_canvas.height  = 250;
        let equalizer_widths = audio_canvas.width;
        let equalizer_height = audio_canvas.height;
       

        // clear canvas area
        canvas_draws.clearRect(0, 0, equalizer_widths, equalizer_height );

        
        // analyzer width
        let audio_analis = audio_contex.createAnalyser();
        audio_analis.fftSize = 256;


        // buffer prototype
        const bufferLength = audio_analis.frequencyBinCount;
        const dataArray    = new Uint8Array(bufferLength);


        let visualizer = () => {
        
            requestAnimationFrame(visualizer);
            audio_analis.getByteFrequencyData(dataArray);

            canvas_draws.fillStyle = "transparent";
            canvas_draws.fillRect(0, 0, equalizer_widths, 250);

            // const sliceWidth = (equalizer_widths * 1.0) / bufferLength;
            const barWidth = ( equalizer_widths / bufferLength) * 2;
            let barHeight;

            let x = 0;

            for (let i = 0; i < bufferLength; i++) {

                barHeight = dataArray[i] / 1;

                var r = barHeight + ( 25 * (i/bufferLength) );
                var g = 250 * (i/bufferLength);
                var b = 50;
        
                canvas_draws.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                canvas_draws.fillRect(x, equalizer_height - barHeight, barWidth, barHeight);
                
                x += barWidth + 4;
            }
        }
        visualizer();


        return audio_contex;
    }


    player() {


        let audio_action = this.parent.querySelector( '.action' );
        let audio_iconic = this.parent.querySelector( '.action img' );
        let audio_limits = 0;
        let audio_object;
        let audio_contex;
    
        audio_action.addEventListener( 'click', () => {

            if ( audio_limits < 1 ) {
                audio_contex = new AudioContext();
                audio_object = this.engine( audio_contex ) ;
                audio_contex.resume();
                this.parent.dataset.status = 'play';
                audio_iconic.src = '/icons/general/pause.svg';
                audio_limits++;
            }
            else if( audio_contex.state == 'running' ) {
                audio_iconic.src = '/icons/general/play.svg';
                this.parent.dataset.status = 'pause';
                audio_contex.suspend();
            } 
            else if( audio_contex.state == 'suspended' ) {
                audio_iconic.src = '/icons/general/pause.svg';
                this.parent.dataset.status = 'play';
                audio_contex.resume();
            }
        }); 
    }
}


/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */