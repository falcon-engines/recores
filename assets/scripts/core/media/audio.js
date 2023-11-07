"use strict";

export class audioplayer {
    

    constructor( target, linker ){
        this.linker = linker;
        this.target = target;
        this.players();
    }


    players() {

        let icons      = this.target.querySelector('.action img');
        let action     = this.target.querySelector('.action'); 
        let audctx     = new AudioContext();
        let buffer     = null;
        let source     = '';
        let analis     = audctx.createAnalyser();
        analis.fftSize = 256;
        let canvas     = this.target.querySelector('.equalizer');
        let executed   = 0;
        canvas.width   = window.innerWidth;
        canvas.height  = 250;
        let drawerctx  = canvas.getContext("2d");
        let buffering  = analis.frequencyBinCount;
        let dataarray  = new Uint8Array(buffering);
        let viswidths  = canvas.width;
        let visheight  = 250;
        let barwidths  = ( viswidths / buffering ) * 1;
        let barheight;
        let statuters  = this.target;
       

        let load = () => {
            const request = new XMLHttpRequest();
            request.open("GET", this.linker );
            request.responseType = "arraybuffer";
            request.onload = function() {
                let undecodedAudio = request.response;
                audctx.decodeAudioData( undecodedAudio, (data) => buffer = data);
            };
            request.send();
        };


        let play = () => {
            source = audctx.createBufferSource();
            source.buffer = buffer;
            source.connect(analis);
            analis.connect(audctx.destination);
            source.start();
        };


        let visz = () => {

            let x = 0;
            requestAnimationFrame(visz);
            analis.getByteFrequencyData(dataarray);

            drawerctx.fillStyle = 'transparent';
            drawerctx.fillRect( 0, 0, viswidths, 250 );

            for ( var i = 0; i < buffering; i++ ) {

                barheight = dataarray[i];
                
                var r = barheight + ( 25 * (i/buffering) );
                var g = 250 * (i/buffering);
                var b = 50;
        
                drawerctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                drawerctx.fillRect( x, visheight - barheight, barwidths, barheight);
        
                x += barwidths + 4;
            }
        }

       
        action.addEventListener('click', ()=> {

            // icons
            if( audctx.state === 'suspended' ) {
                icons.src = '/icons/general/pause.svg';
                statuters.dataset.status = 'play';
            }
            else if( audctx.state === 'running' )  {
                icons.src = '/icons/general/play.svg';
                statuters.dataset.status = 'pause';
            }
            
            // play and pause
            if ( executed < 1 ) {
                executed++;
                load(); play(); visz();
            }
            else if( audctx.state === 'suspended' ) {
                audctx.resume().then(function() {
                    
                    console.log( 'Suspend context' );
                });  
            }
            else if( audctx.state === 'running' ) {
                audctx.suspend().then(function() {
                  
                    console.log( 'Resume context' );
                });
            } 
        });


        load(); play();
    }
}

/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */