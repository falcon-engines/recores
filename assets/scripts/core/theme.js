// darkmode switcher
export class themebasics {

    
    constructor(){
        let dropdawn = document.querySelector( '.dropdown' );
        if ( dropdawn ) {
            this.dropdown();
        }
        let darkmode = document.querySelector( '.theme-menu' );
        if ( darkmode ) {
            this.darkmode();
        }

        // progressive web aplication
        let pwascript = document.querySelector('meta[name="pwa-engines"]');
        if ( pwascript ) {
            console.log('pwa active')
            this.pwaengine();
        }
    }


    dropdown() {
        let droper = Array.prototype.slice.call( document.querySelectorAll( '.dropdown' ) );
        droper.forEach( dropmenu => {
            let action = dropmenu.querySelector( '.action' );
            let openow = dropmenu.querySelector( '.menu' );
            let allnav = Array.prototype.slice.call( document.querySelectorAll( '.dropdown .menu' ) );
            action.addEventListener( 'click', () => {
                if (openow.classList.contains( 'd-hide' ) ) {
                    allnav.forEach( allmenu => { allmenu.classList.add( 'd-hide' ); });
                    openow.classList.remove( 'd-hide' ); 
                }
                else {
                    openow.classList.add( 'd-hide' ); 
                }
            });
        });
    }


    pwaengine() {
        if('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/webapps.js', { scope: '/' })
                .then(function(registration) {
                    // console.log('Service Worker Registered');
                });
      
            navigator.serviceWorker
                .ready
                .then(function(registration) {
                    // console.log('Service Worker Ready');
                });
        }
    }


    darkmode() {
        let actions = Array.prototype.slice.call( document.querySelectorAll( '.theme-menu .item' ) );
        actions.forEach( action => {
            action.addEventListener( 'click', (event)=> {
                let themset = event.currentTarget.dataset.themeset;
                localStorage.setItem( 'theme', themset );
                document.documentElement.setAttribute( 'data-mode', themset );
                event.currentTarget.parentElement.classList.add( 'dnone' );
            });
        })
    }
}