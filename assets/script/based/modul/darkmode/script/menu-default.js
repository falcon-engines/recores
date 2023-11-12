function darkmode() {
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