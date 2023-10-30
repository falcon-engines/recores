export class themebasics {


    constructor(){
        
        // tablayout engines
        if ( document.querySelector( '.tabs' ) ) {
            this.tabpreps();
            this.tabmodul();
        }

        // dropdown engines
        if ( document.querySelector( '.dropdown' ) ) {
            this.dropdown();
        }
   
        // themes darkmode
        if ( document.querySelector( '.theme-menu' ) ) {
            this.darkmode();
        }
   
        // progressive web aplication
        if ( document.querySelector('meta[name="pwa-engines"]') ) {
            console.log('pwa active')
            this.pwaengine();
        }
    }


    tabpreps() {
        let builder = Array.prototype.slice.call( document.querySelectorAll( '.tabs.build' ) );
        let tabcount = 0;
        // tabs builder
        builder.forEach( tab => {
            // tab menu
            let tabmenus = Array.prototype.slice.call( tab.querySelectorAll( '.tabs-open' ) );
            tabmenus.forEach( action => {
                if ( tabcount === 0 ) {
                    action.classList.add( 'active' );
                }
                tabcount ++;
            });
            // tab page
            tabcount = 0;
            let tabloads = tab.querySelector( '.tabs-load' );
            let tabdatas = atob(tabloads.dataset.tabs).toLowerCase().replace(/\s/g,'').split( ',' );
            let tabitems = Array.prototype.slice.call( tabloads.querySelectorAll( 'div' ) );
            tabitems.forEach( item => {
                if ( tabcount === 0 ) {
                    item.classList.add( 'active' );
                }
                item.setAttribute( 'id', 'tab-'+ tabdatas[tabcount] );
                tabcount ++;
            });
            tab.classList.remove('build');
        });
    }
    

    tabmodul() {
        let actions = Array.prototype.slice.call( document.querySelectorAll('.tabs-open') );
        actions.forEach( item => {
            item.addEventListener('click', (event)=> {
                let action = event.currentTarget;
                let parent = action.parentElement.parentElement;
                let target = parent.querySelector( '#'+action.dataset.target );
                if ( target ) {
                    // tabs menu
                    let getact = Array.prototype.slice.call(parent.querySelectorAll( '.tabs-open' ));
                    getact.forEach( item => {
                        item.classList.remove( 'active' );
                    });
                    action.classList.add( 'active' );
                    // tabs page
                    let getcon = Array.prototype.slice.call(parent.querySelectorAll('.tab-content' ));
                    getcon.forEach( item => {
                        if ( item.classList.contains('active') ) {
                            item.classList.remove( 'active' );
                        }
                    });
                    target.classList.add( 'active' );
                } 
            });
        });
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