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
    }


    dropdown() {
        let droper = Array.prototype.slice.call( document.querySelectorAll( '.dropdown' ) );
        droper.forEach( dropmenu => {
            let action = dropmenu.querySelector( '.action' );
            let openow = dropmenu.querySelector( '.menu' );
            let allnav = Array.prototype.slice.call( document.querySelectorAll( '.dropdown .menu' ) );
            action.addEventListener( 'click', () => {
                if (openow.classList.contains( 'dnone' ) ) {
                    allnav.forEach( allmenu => { allmenu.classList.add( 'dnone' ); });
                    openow.classList.remove( 'dnone' ); 
                }
                else {
                    openow.classList.add( 'dnone' ); 
                }
            });
        });
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