let image = () => {
    
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

let theme = () => {

}

window.addEventListener("load", (event) => {
    image();
    theme();
});