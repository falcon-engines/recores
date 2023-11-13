"use strict";

export class imageplayer {

    constructor( data, entry ){

        this.target = entry.target.id;
        this.source = data[entry.target.id].source;
        this.thumbs = data[entry.target.id].cover;
        this.titles = data[entry.target.id].title;

        this.bootup();
    }

    bootup() {

    }

    render() {

    }


    player() {

    }
}