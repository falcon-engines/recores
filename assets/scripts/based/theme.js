// darkmode switcher
export class themebasics {

    constructor(){

        let thememode = document.querySelector('.theme-mode');
        if ( thememode ) {
            this.darkmode( thememode );
        }

    }

    darkmode( item ) {
        let action = Array.prototype.slice.call( item.querySelectorAll( '.action' ) );
        let dialog = item.querySelector( '.menu' );
        action.forEach( button => {
            button.addEventListener( 'click', () => {
                let actions = Array.prototype.slice.call(dialog.querySelectorAll( '.mode ' ) );
                if (dialog.classList.contains( 'dnone' ) ) {
                    dialog.classList.remove( 'dnone' ); 
                }
                else {
                    dialog.classList.add( 'dnone' ); 
                }
                actions.forEach( action => {
                    action.addEventListener( 'click', (event)=> {
                        let themset = event.currentTarget.dataset.themeset
                        localStorage.setItem( 'theme', themset );
                        document.documentElement.setAttribute( 'data-mode', themset );
                        dialog.classList.add( 'dnone' );
                    });
                });
            });
        });
    }
}