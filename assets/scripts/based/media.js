export let imagesload = () => {
    
    let allimg = document.querySelectorAll('.lazy-load') 
    let arrimg = Array.prototype.slice.call(allimg);

    arrimg.forEach( img => {

        let imgpic = img.querySelector('img');
        let imgcap = img.querySelector('p');
        let checks = new XMLHttpRequest();

        // check http image
        checks.open('HEAD', imgpic.dataset.img, false);
        checks.send();
    
        if ( checks.status == 200 ) {

            // image setup
            imgpic.src = imgpic.dataset.img

            // image loads
            imgpic.addEventListener( 'load', () => {
                imgpic.classList.add('picmain');
                imgpic.classList.remove('icon');
                img.classList.add('picbox');

                // display image
                img.classList.remove('hide');

                // setup caption
                imgcap.innerText = imgcap.dataset.alt
            }) 

        } else {
            img.classList.add('noimg');
            img.classList.remove('hide');
        }
    });
}

export let animaxload = () => {

    let animax = document.querySelector('.animax');
 
    if (animax) {

        // load player script
        let mainjs = document.getElementById('main-jsx');
        let gensrc = document.createElement('script');
        gensrc.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
        gensrc.setAttribute("type", "module");
        mainjs.after(gensrc);

        // load player embed
    }   
}

export let videosload = () => {

    // https://blog.logrocket.com/understanding-lazy-loading-javascript/

    if ( document.querySelector('.video-lazy') ) {

        // callback
        let intersection = ( entries, observer ) => {
            entries.forEach(( entry ) => {
                if ( entry.isIntersecting ) {
                    let video = entry.target;
                    video.classList.remove('video-lazy');
                    observer.unobserve(video);
                }
            });
        };

        // observation
        let targets = document.querySelectorAll('.video-lazy');
        let options = { root: null, rootMargin: '0px' };
        let observe = new IntersectionObserver( intersection, options );
        targets.forEach((video) => {
            observe.observe(video);
        });
    }
}

export let pdfdocload = () => {

}