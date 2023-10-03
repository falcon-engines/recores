let image = () => {
    
    let allimg = document.querySelectorAll('.picbox') 
    let arrimg = Array.prototype.slice.call(allimg);

    arrimg.forEach( img => {

        let imgpic =  img.querySelector('img');
        let imgcap =  img.querySelector('p');
        let checks = new XMLHttpRequest();

        // check http image
        checks.open('HEAD', imgpic.dataset.img, false);
        checks.send();
    
        if ( checks.status == 200 ) {

            // set class
            img.classList.remove('picbox');
            imgpic.classList.remove('icon');
            imgpic.classList.add('picmain');

            // set value
            imgpic.src = imgpic.dataset.img
            imgcap.innerText = imgcap.dataset.alt
        }
    });
}

image();
