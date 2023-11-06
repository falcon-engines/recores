"use strict";


export class audiowafers {

    constructor( target, linker ){
        this.linker = linker;
        this.target = target;
        this.builder();
    }

    builder() {

        // waveform prototype
        const canvas = document.createElement('canvas')
        const equals = this.target.querySelector('.effect'); 
        const iconic = this.target.querySelector('.action'); 
        const ctx    = canvas.getContext('2d');


        // waveform gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
        gradient.addColorStop(0, '#656666') // Top color
        gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
        gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
        gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
        gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
        gradient.addColorStop(1, '#B1B1B1') // Bottom color

        // progress gradient
        const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
        progressGradient.addColorStop(0, '#EE772F') // Top color
        progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
        progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
        progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
        progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
        progressGradient.addColorStop(1, '#F6B094') // Bottom color


        // wavesuffer rendering
        const wavesurfer = WaveSurfer.create({
            container: equals,
            waveColor: gradient,
            progressColor: progressGradient,
            barWidth: 2,
            url: this.linker,
        })
       

        // wavesuffer action
        let waver_plays = ()=> {
            wavesurfer.play();
            iconic.firstChild.src = '/icons/general/pause.svg';
        } 

        let waver_pause = ()=> {
            wavesurfer.pause();
            iconic.firstChild.src = '/icons/general/play.svg';
        } 

        // event listener
        wavesurfer.on('finish', () => {
            wavesurfer.stop();
            iconic.firstChild.src = '/icons/general/play.svg';
        })

        wavesurfer.on('click', () => {
            wavesurfer.play();
            iconic.firstChild.src = '/icons/general/pause.svg';
        })

        iconic.addEventListener('click', ()=> {
            ( wavesurfer.isPlaying() ) ? waver_pause() : waver_plays();
        });
    }
}

/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */