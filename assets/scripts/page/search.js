/** search engine */
let search_param = (params) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let value = urlParams.get(params);
    return value;
}


let search_engine = async() => {
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
    if ( data.section.length > 0 ) {
        root = document.getElementById('tab-list-'+data.section);
    }
    else {
        root = document.getElementById('tab-list-general');
    }
    
    // link data
    link.setAttribute( 'href', data.uri );
    link.classList.add( 'search-item', 'no-decor', 'ft-u', 'mb-6', 'flex' );
    
    // lbox data
    lbox.classList.add( 'l-box' );

    // head data
    head.innerText = data.title;
    head.classList.add( 'fz-120', 'ft-u' );

    // desc data
    desc.classList.add( 'fz-85', 'ft-u', 'description' );
    desc.innerText = data.date+'  '+'  '+' ─ '+'  '+'  '+data.description.substring(0, 120) ;

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


/** video engine */

let videos_listed = ( data ) => {

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
    if ( data.section.length > 0 ) {
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
    if ( data.section.length > 0 ) {
        head.innerText = data.section+' related video'
        
    }
    else {
        head.innerText = 'Featured Video'
    }
   
    // vids data
    vids.src      = data.video;
    vids.width    = root.offsetWidth;
    vids.controls = true;
    vids.setAttribute( 'controlsList', 'nodownload noplaybackrate' );
    vids.setAttribute( 'disablePictureInPicture', '' )

    // builders
    root.appendChild(vids);
}


/** noresult engine */

let layout_losed = ( data ) => {
    console.log('no result')
}


/** audio engine */

let wavers_listed = ( data ) => {

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
    let wave = document.createElement('div');

    
    // root element 
    if ( data.section.length > 0 ) {
        root = document.getElementById('audio-list-'+data.section);
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
    if ( data.section.length > 0 ) {
        head.innerText = data.section+' Listening'
        
    }
    else {
        head.innerText = 'Listening Now'
    }


    // auds boxs
    auds.classList.add('flex', 'align-v', 'audio-playlist');

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


let wavers_engine = ( root ) => {
   
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
            const step = 10

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


let wavers_player = ()=> {

    let actions = Array.prototype.slice.call(document.querySelectorAll( '.audio-play' ));
    let counter = 0;
    let players = '';
    
    actions.forEach( control => {
        control.addEventListener('click', (event)=> {

            let init = event.currentTarget;
            let root = init.parentElement.parentElement;
            let wave = root.querySelector('.wave-player');

            if ( counter < 1 ) {
                players = wavers_engine( wave );
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



/** main process */
( async() => {

    // prepare data
    let query = search_param('q');
    let datas = await search_engine(query);

    // load and view
    if ( datas.length > 0 ) {
        for (var i = 0; i < datas.length; i++){
            if ( datas[i].title.includes(query) ){
                search_listed( datas[i] );
                videos_listed( datas[i] );
                wavers_listed( datas[i] )
            }
        }
    }
    else {
        layout_losed();
    }

    // load wave
    wavers_player();
})();