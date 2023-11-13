"use strict";

export class themesearch {

    constructor( file_paths ){

        // check class exist
        if ( ! document.querySelector( '.search-form' ) && ! document.getElementById( 'search-page' ) ) {
            return;
        }

        // define paths
        this.file_paths = file_paths;

        // input method
        if ( document.querySelector( '.search-form' ) ) {
            this.search_input();
        }

        // render method
        if ( document.getElementById( 'search-page' ) ) {
            this.render_search();
        }
    }

    /**
     * INPUTS METHOD
     * Input search keyword from page and redirect queried keyword to search result page
     * 
     */
    
    search_input() {
        let action = document.getElementById( 'search-input' );
        action.addEventListener("keypress", function(event) {
            if ( event.key === "Enter" ) {
                event.preventDefault();
                let query = this.value.replace(/[^a-z0-9]+/gi, '+').toLowerCase();
                window.location.href = window.location.origin+'/search/?q='+query;
            }
        });
    }


    /**
     * SEARCH METHOD
     * Start processing queries from input methods and return search result
     * 
     */


    // define search stopword
    search_dicword() {

        let stopwords_id = [ 'yes', 'hi', 'so', 'say', 'me', 'uhh', 'omg', 'go', 'hello', 'hi' ];
        let stopwords_en = [ 'yes', 'hi', 'so', 'say', 'me', 'uhh', 'omg', 'go', 'hello', 'hi' ];
        let stopwordjoin = stopwords_id.concat(stopwords_en); 
        let stopwordalls = [];

        stopwordjoin.forEach( items => {
            ( ! stopwordalls.includes( items ) ) ? stopwordalls.push( items ) : '';
        });

        return stopwordalls;
    }


    // search query sanitizer
    search_filters( input ) {
        let normalizer = document.createElement("textarea");
        normalizer.innerHTML = input;
        let inputDecoded = normalizer.value;
        return " " + inputDecoded.trim().toLowerCase().replace(/[^0-9a-z ]/gi, " ").replace(/\s+/g, " ") + " ";
    }  


    // populate and arrange data from database
    search_ranking( terms, weight, target ) {

        let ranking = 0;
        terms.forEach(function ( term ) {
            if (~ target.indexOf(term.term) ) {
                let idx = ~target.indexOf(term.term);
                while (~idx) {
                    ranking += term.weight * weight;
                    idx = target.indexOf(term.term, idx + 1);
                }
            }
        });
        return ranking;
    }


    // generate query patern
    async search_patern( getquery ) {

        if ( ! getquery ) {
            return;
        }

        let mainquery = getquery.replace( '+' , ' ').split(' ');
        let stopwords = this.search_dicword();
        let resulting = [];
        
        for ( let i = 0; i < mainquery.length; i += 1 ) {

            for (let  j = i; j < mainquery.length; j += 1) {
                let weight = Math.pow(2, j - i);
                let string = "";

                for ( let  k = i; k <= j; k += 1 ) {
                    string += ( mainquery[k] + " " );
                }

                let new_term = string.trim();
                if ( new_term.length >= 3 && stopwords.indexOf(new_term) < 0 ) {
                    resulting.push({
                        weight: weight,
                        term: " " + string.trim() + " "
                    });
                }
            }
        }
        return resulting;
    }


    // begin search function
    async search_method() {

        // search variable
        let getquery = new URLSearchParams( window.location.search ).get('q').toLowerCase();
        let keywords = await this.search_patern(getquery)
        let getdatum = await fetch(this.file_paths);
        let database = await getdatum.json();
        let resultat = [];


        // reindex database
        let basehosts   = {};
        let duplicate   = {};
        basehosts.index = [];


        database.forEach(function ( result)  {
            if ( result.tags && !duplicate[result.links] ) {
                let populate = {};
                let new_tags = [];
                populate.title = this.search_filters(result.title);
                populate.descs = this.search_filters(result.description);
                populate.links = result.links;
                populate.video = result.video;
                populate.image = result.image;
                populate.audio = result.audio;
                populate.dates = result.date;
                populate.sects = result.section;
                populate.categ = result.category;
                
                result.tags.forEach( function ( tag ) {
                    return new_tags.push( this.search_filters( tag ) );
                });
                populate.tags = new_tags;
                basehosts.index.push(populate);
                duplicate[result.links] = true;
            }
        }.bind(this));
    
        
        // engine algorithma
        basehosts.index.forEach(function (item) {
            if ( item.tags ) {
                let weight_1 = 0;
                
                // first word on title ranking value
                keywords.forEach(function (term) {
                    if ( item.title.startsWith(term.term) ) {
                        weight_1 += term.weight * 32;
                    }
                });
                
                // title ranking value
                weight_1 += this.search_ranking(keywords, 16, item.title);

                // description ranking value
                weight_1 += this.search_ranking(keywords, 2,  item.descs);

                // tagging ranking value
                item.tags.forEach(function ( tag ) {
                    weight_1 += this.search_ranking(keywords, 4, tag );
                });
                   
                if ( weight_1 ) {
                    resultat.push({
                        weight: weight_1,
                        item: item
                    });
                }
            }
        }.bind(this)); 


        // sorta data based on ranking
        resultat.sort( (a, b) => { 
            return b.weight - a.weight; 
        });

        return resultat;
    }



    /**
     * RENDER METHOD
     * get search result data and render to html
     * 
     */


    async render_search() {
        let search_result = await this.search_method();
        this.render_layout( search_result );
        this.render_result( search_result );
        this.wavers_loader();
    }


    result_listed( data ) {

        // prototype
        let link = document.createElement('a');
        let head = document.createElement('h1');
        let lbox = document.createElement('div');
        let rbox = document.createElement('canvas');
        let desc = document.createElement('p');
        let root = null;
        
        // root element 
        if ( data.sects.length > 0 ) {
            root = document.getElementById('tab-list-'+data.sects);
        }
        else {
            root = document.getElementById('tab-list-general');
        }
        
        // link data
        link.setAttribute( 'href', data.links );
        link.classList.add( 'items', 'no-decor', 'ft-u', 'mb-6', 'flex' );
        
        // lbox data
        lbox.classList.add( 'l-box', 'pr-5' );

        // head data
        head.innerText = data.title;
        head.classList.add( 'fz-120', 'ft-u' );

        // desc data
        desc.classList.add( 'fz-85', 'ft-u', 'description' );
        desc.innerText = data.dates+'  '+'  '+' ─ '+'  '+'  '+data.descs.substring(0, 120) ;

        // imgs data
        rbox.src    = data.image;
        rbox.height = 92;
        rbox.width  = 92;
        rbox.classList.add( 'round-10', 'ft-u', 'ml-a' );
    
        // builders
        root.appendChild(link);
        link.appendChild(lbox);

        if ( data.image ) {
            let ctx = rbox.getContext("2d");
            let img = new Image();
            img.src = data.image;
            img.onload = function() {
                ctx.drawImage(img, 0, 0, 92, 92);
            };
            link.appendChild(rbox);
        }
        
        lbox.appendChild(head);
        lbox.appendChild(desc);
    }


    videos_listed( data ) {
        
        // filterings
        if ( ! data.video  ) {
            return;
        }

        // prototype
        let root = ( data.sects.length > 0 ) ? document.getElementById('video-list-'+data.sects) : document.getElementById('video-list-general') ;
        let vids = document.createElement('video');
        let boxs = root.querySelector('.video-player');
        let head = root.querySelector('.heading h2');

        // sumof list
        if ( boxs.childNodes.length  ) {
            return;
        }

        // set title
        head.innerText = ( data.sects.length > 0 ) ?  data.sects+' Video' : 'Featured Video';
        
        // vids data
        vids.src      = data.video;
        vids.controls = true;
        vids.setAttribute( 'controlsList', 'nodownload noplaybackrate' );
        vids.setAttribute( 'disablePictureInPicture', '' )

        // builders
        boxs.appendChild(vids);
        root.classList.remove('d-hide');
    } 


    audios_listed( data ) {

        // filterings
        if ( ! data.audio  ) {
            return;
        }

        // prototype
        let root = ( data.sects.length > 0 ) ? document.getElementById('audio-list-'+data.sects) : document.getElementById('audio-list-general');
        let auds = document.createElement('div');
        let name = document.createElement('h3');
        let cons = document.createElement('span');
        let icon = document.createElement('img');
        let boxs = document.getElementById('audio-overview');
        let head = root.querySelector('.heading h2');
        let list = root.querySelector('.playlist');

        // auds prep
        root.classList.remove('d-hide');
        head.innerText = ( data.sects.length > 0 ) ? data.sects+' Listening' : 'Listening Now';

        // auds boxs
        auds.classList.add('flex', 'align-v', 'audio-list');

        // auds name
        name.classList.add('fz-95', 'fw-4x', 'px-1', 'py-1');
        name.innerText = data.title;

        // auds con
        cons.classList.add('ml-a', 'px-1', 'py-1', 'audio-play');
        cons.dataset.link = data.audio;

        // auds icon
        icon.src = '/icons/general/play.svg';
        icon.classList.add('icons');
        icon.width = 18;
        icon.height = 18;

        // builder
        list.appendChild(auds);
        auds.appendChild(name);
        auds.appendChild(cons);
        cons.appendChild(icon);
    } 


    render_layout( data ) {

        let query = new URLSearchParams( window.location.search ).get('q');
        let forms = document.querySelector('#formed');
        let rests = document.querySelector('#result');
        let boxes = forms.querySelector('.container');
        let playa = boxes.querySelector('.animate');
        let icons = boxes.querySelector('.icons');
        let title = boxes.querySelector('.title');
        let areas = document.getElementById('result');
    
    
        if ( ! data || ! query  ) {
            forms.classList.remove('d-hide');
            boxes.classList.add('started');
            rests.classList.add('d-hide');
            icons.src = '/icons/general/search.svg';
            title.innerText = 'Mulai Pencarian';
        }
        else if ( data.length > 0 ) {
            areas.classList.remove('d-hide');
            forms.classList.remove('d-hide');
            boxes.classList.add('founded');
           
        }
        else if ( data.length == 0 ) {
            forms.classList.remove('d-hide');
            boxes.classList.add('lossed');
            if ( window.innerWidth > 960 ) {
                playa.src = '/anima/technology/robot-factory-research.lottie';
            }   
        }
        else {
            
        }
    }


    render_result( data ) {
        
        if ( data ) {
            for (let i = 0; i < data.length && i < 30 ; i += 1) {
     
                let result = data[i].item;
                this.result_listed( result );
        
                if ( window.innerWidth > 960){
                    this.videos_listed( result );
                    this.audios_listed( result );
                }
            }
        }
    }


    /**
     * WAVESURFER METHOD
     * load wavesurfer object and method
     * 
     */


    wavers_loader() {

        let mainjs = document.getElementById( 'base-jsx' );
        let gensrc = document.createElement( 'script' );
        gensrc.src = "https://unpkg.com/wavesurfer.js@7";
        gensrc.setAttribute( 'type', 'module');
        gensrc.setAttribute( 'defer', '');
        mainjs.after( gensrc );

        gensrc.onload = ()=> {
            this.wavers_player();
        }
    }

  
    wavers_player() {

        if ( ! document.querySelector( '.audio-list' ) ) {
            return;
        }

        let players = Array.prototype.slice.call( document.querySelectorAll( '.wave-audio' ) )

        players.forEach( player => {
            let actions = Array.prototype.slice.call( player.querySelectorAll( '.audio-play' ) );
            let wavecon = this.wavers_objects( player.querySelector( '.wave-player' ) );
            actions.forEach( action => {
                action.addEventListener('click', (event)=> {

                    let init = event.currentTarget;
                    let wave = init.parentElement.parentElement.querySelector('.wave-player');

                    // show equalizer
                    ( wave.classList.contains('d-hide') ) ? wave.classList.remove('d-hide') : '';

                    if ( wave.dataset.link != init.dataset.link  ) {

                        actions.forEach( remove => {
                            remove.firstChild.src = '/icons/general/play.svg';
                        });
        
                        // set data link
                        wave.dataset.link = init.dataset.link;
        
                        // wait data load
                        wavecon.load(init.dataset.link); 
                        wavecon.loaded = false;
                        wavecon.on("ready", function () {
                            if( ! wavecon.loaded ) {
                                wavecon.loaded = true;
                                wavecon.play();
                            }
                        });
                    }

                    let waver_plays = ()=> {
                        wavecon.play();
                        init.firstChild.src = '/icons/general/pause.svg';
                    } 

                    let waver_pause = ()=> {
                        wavecon.pause();
                        init.firstChild.src = '/icons/general/play.svg';
                    } 
                    
                    ( wavecon.isPlaying() ) ? waver_pause() : waver_plays();
                    

                    // pause audio data attribute is change
                    // https://stackoverflow.com/questions/41424989/javascript-listen-for-attribute-change
                    let observer = new MutationObserver( (mutations) => {
                        mutations.forEach( (mutation) => {
                            if (mutation.type === "attributes") {
                                waver_pause();
                            }
                        });
                    });

                    // observerdata attribute is change
                    observer.observe( wave, {
                        attributes: true 
                    });
                });
            });
        });


        let tabceks = Array.prototype.slice.call( document.querySelectorAll( '.tabs-open' ) )
        tabceks.forEach( tabs => {
            tabs.addEventListener('click', (event)=> {
                let loader = Array.prototype.slice.call( document.querySelectorAll( '.wave-player' ) );
                loader.forEach( player => {
                    player.dataset.link = '';
                });
            });
        });
    }


    wavers_objects( root ) {

        // Custom rendering function
        const wavesurfer = WaveSurfer.create({
            container: root,
            waveColor: 'rgba(255, 255, 255, .7)',
            progressColor: '#00a1ff',
        
            /**
             * Render a waveform as a squiggly line
             * @see https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
             */

            renderFunction: (channels, ctx) => {
                const { width, height } = ctx.canvas
                const scale = channels[0].length / width
                const step = 9
    
                ctx.translate(0, height / 2)
                ctx.strokeStyle = ctx.fillStyle
                ctx.beginPath()
    
                for (let i = 0; i < width; i += step * 2) {
                const index = Math.floor(i * scale)
                const value = Math.abs(channels[0][index])
                let x = i
                let y = value * height
    
                ctx.moveTo(x, 0)
                ctx.lineTo(x, y)
                ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true)
                ctx.lineTo(x + step, 0)
    
                x = x + step
                y = -y
                ctx.moveTo(x, 0)
                ctx.lineTo(x, y)
                ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false)
                ctx.lineTo(x + step, 0)
                }
    
                ctx.stroke()
                ctx.closePath()
            },
        })
    
        return wavesurfer;
    }
}

/**
 * @license Copyright 2023 PT Lektor Media Utama
 * @author Al Muhdil Karim
 */