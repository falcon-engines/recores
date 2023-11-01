/**
 * https://blog.jeremylikness.com/blog/dynamic-search-in-a-static-hugo-website/
 */

/** search engine */
let search_param = (params) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let value = urlParams.get(params);
    return value;
}


let search_datums = async() => {
    let json_link = await fetch('index.json');
    let json_data = await json_link.json();
    return json_data;
}


let search_listed = ( data ) => {

    // prototype
    let link = document.createElement('a');
    let head = document.createElement('h1');
    let lbox = document.createElement('div');
    let rbox = document.createElement('canvas');
    let desc = document.createElement('p');
    let root = '';
    
    // root element 
    if ( data.sects.length > 0 ) {
        root = document.getElementById('tab-list-'+data.section);
    }
    else {
        root = document.getElementById('tab-list-general');
    }
    
    // link data
    link.setAttribute( 'href', data.uri );
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


let search_querys = ( data ) => {

    if (! data ) {
        return;
    }

    var datas = data.replace( '+' , ' ');
    var terms = datas.split(' ');
    var trees = [];

    var stopwords = ['yes',
                'hi',
                'so',
                'say',
                'me',
                'uhh',
                'omg',
                'go',
                'hello',
                'hi'
            ];

    for (var i = 0; i < terms.length; i += 1) {
        for (var j = i; j < terms.length; j += 1) {
            var weight = Math.pow(2, j - i);
            var str = "";
            for (var k = i; k <= j; k += 1) {
                str += (terms[k] + " ");
            }
            var newTerm = str.trim();
            if (newTerm.length >= 3 && stopwords.indexOf(newTerm) < 0) {
                trees.push({
                    weight: weight,
                    term: " " + str.trim() + " "
                });
            }
        }
    }

    return trees;

}


let text_sanitize = ( input ) => {

    let normalizer = document.createElement("textarea");
    normalizer.innerHTML = input;
    let inputDecoded = normalizer.value;
    return " " + inputDecoded.trim().toLowerCase().replace(/[^0-9a-z ]/gi, " ").replace(/\s+/g, " ") + " ";
}


let search_engine = ( query, datas ) => {

    if ( ! datas || ! query ) {
        return;
    }

    let allresult   = [];  
    let basehosts   = {};
    let duplicate   = {};
    basehosts.index = [];
    

    datas.forEach(function (result) {

        if ( result.tags && !duplicate[result.links] ) {
            let populate = {};
            let new_tags = [];
            populate.title = text_sanitize(result.title);
            populate.descs = text_sanitize(result.description);
            populate.links = result.links;
            populate.video = result.video;
            populate.image = result.image;
            populate.audio = result.audio;
            populate.dates = result.date;
            populate.sects = result.section;
            populate.categ = result.category;
            
            result.tags.forEach(function (tag) {
                return new_tags.push(text_sanitize(tag));
            });
            populate.tags = new_tags;
            basehosts.index.push(populate);
            duplicate[result.links] = true;
        }
    });

   
    basehosts.index.forEach(function (item) {
        if ( item.tags ) {
            let weight_1 = 0;
            
            query.forEach(function (term) {
                if ( item.title.startsWith(term.term) ) {
                    weight_1 += term.weight * 32;
                }
            });
            weight_1 += search_termin(query, 16, item.title);
            weight_1 += search_termin(query, 2,  item.descs);
            item.tags.forEach(function ( tag ) {
                weight_1 += search_termin(query, 4, tag );
            });

           
            if (weight_1) {
                allresult.push({
                    weight: weight_1,
                    item: item
                });
            }
        }
    });
 
    return allresult;
}


let search_termin = ( terms, weight, target ) => {
    let resultat = 0;
    terms.forEach(function ( term ) {
        if (~ target.indexOf(term.term) ) {
            let idx = ~target.indexOf(term.term);
            while (~idx) {
                resultat += term.weight * weight;
                idx = target.indexOf(term.term, idx + 1);
            }
        }
    });
    return resultat;
}

/** video engine */

let video_listed = ( data ) => {

    // filterings
    if ( ! data.video  ) {
        return;
    }

    // prototype
    let vids = document.createElement('video');
    let root = '';
    let boxs = document.getElementById('video-overview');
    let head = boxs.querySelector('.heading h2');
    
    // root element 
    if ( data.sects.length > 0 ) {
        root = document.getElementById('video-list-'+data.section);
        if ( root.childNodes.length) {
            return;
        }
    }
    else {
        root = document.getElementById('video-list-general');
        if ( root.childNodes.length) {
            return;
        }
    }

    // vids prep
    boxs.classList.remove('d-hide');
    if ( data.sects.length > 0 ) {
        head.innerText = data.sects+' related video'
        
    }
    else {
        head.innerText = 'Featured Video'
    }

   
    // vids data
    vids.src      = data.video;
    vids.controls = true;
    vids.setAttribute( 'controlsList', 'nodownload noplaybackrate' );
    vids.setAttribute( 'disablePictureInPicture', '' )

    // builders
    root.appendChild(vids);
}



/** audio engine */

let waver_listed = ( data ) => {

    // filterings
    if ( ! data.audio  ) {
        return;
    }

    // prototype
    let auds = document.createElement('div');
    let name = document.createElement('h3');
    let cons = document.createElement('span');
    let icon = document.createElement('img');
    let root = '';
    let boxs = document.getElementById('audio-overview');
    let head = boxs.querySelector('.heading h2');

    
    // root element 
    if ( data.sects.length > 0 ) {
        root = document.getElementById('audio-list-'+data.sects);
        if ( root.childNodes.length > 3) {
            return;
        }
    }
    else {
        root = document.getElementById('audio-list-general');
        if ( root.childNodes.length > 5) {
            return;
        }
    }

    // auds prep
    boxs.classList.remove('d-hide');
    if ( data.sects.length > 0 ) {
        head.innerText = data.section+' Listening'
        
    }
    else {
        head.innerText = 'Listening Now'
    }


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
    root.appendChild(auds);
    auds.appendChild(name);
    auds.appendChild(cons);
    cons.appendChild(icon);
}


let waver_engine = ( root ) => {
   
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


let waver_player = ()=> {

    let actions = Array.prototype.slice.call(document.querySelectorAll( '.audio-play' ));
    let counter = 0;
    let players = '';
    
    actions.forEach( control => {
        control.addEventListener('click', (event)=> {

            let init = event.currentTarget;
            let root = init.parentElement.parentElement;
            let wave = root.querySelector('.wave-player');

            if ( counter < 1 ) {
                players = waver_engine( wave );
                counter++;
            }
           
            if ( wave.dataset.link != init.dataset.link  ) {

                actions.forEach( remove => {
                    remove.firstChild.src = '/icons/general/play.svg';
                });

                // set data link
                wave.dataset.link = init.dataset.link;

                // wait data load
                players.load(init.dataset.link); 
                players.loaded = false;
                players.on("ready", function () {
                    if( ! players.loaded ) {
                        players.loaded = true;
                        players.play();
                    }
                });
            }
             
            if ( players.isPlaying() ) {
                players.pause();
                init.firstChild.src = '/icons/general/play.svg';
            }
            else {
                players.play();
                init.firstChild.src = '/icons/general/pause.svg';
           }
        })
    });
}



/** corest engine */

let result_loads = ( data ) => {

    if ( ! data ) {
        return;
    }

    data.sort(function (a, b) { return b.weight - a.weight; });
    for (let i = 0; i < data.length && i < 30 ; i += 1) {
     
        let result = data[i].item;
        search_listed( result );

        if ( window.innerWidth > 960){
            video_listed( result );
            waver_listed( result );
        }
    }

    // load audio engine
    waver_player(); 
}


let result_losed = ( data ) => {
   
    let query = search_querys( search_param('q') );
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



/** main process */

window.addEventListener("load", async()=> {
    let jsons = await search_datums();
    let query = search_querys( search_param('q') );
    let datas = search_engine( query, jsons );
    result_loads( datas );
    result_losed( datas );
 
});
   
