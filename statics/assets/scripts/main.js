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
    let alltheme = document.querySelector('.theme-mode') 
    if ( alltheme ) {
        let action = Array.prototype.slice.call(alltheme.querySelectorAll('.action'));
        let dialog = alltheme.querySelector('.menu');
        action.forEach( button => {
            button.addEventListener( 'click', () => {
                let actions = Array.prototype.slice.call(dialog.querySelectorAll('.mode'));
                if (dialog.classList.contains('dnone')) {
                    dialog.classList.remove('dnone'); 
                }
                else {
                    dialog.classList.add('dnone'); 
                }
                actions.forEach( action => {
                    action.addEventListener( 'click', (event)=> {
<<<<<<< HEAD:statics/library/scripts/main.js
                        localStorage.removeItem( "theme" );
                        localStorage.setItem( "theme", event.currentTarget.dataset.themeset );
=======
                        localStorage.setItem("theme", event.currentTarget.dataset.themeset );
                        document.documentElement.setAttribute("data-mode", event.currentTarget.dataset.themeset);
                        dialog.classList.add('dnone');
>>>>>>> 5345a0b6a6d438ae97619f9e41e3ed88e445889a:statics/assets/scripts/main.js
                    });
                });
            });
        });
    }
}

window.addEventListener("load", (event) => {
    //image();
    theme();
});