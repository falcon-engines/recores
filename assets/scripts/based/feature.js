// darkmode switcher
export let dark_modes = () => {
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
                        localStorage.setItem("theme", event.currentTarget.dataset.themeset );
                        document.documentElement.setAttribute("data-mode", event.currentTarget.dataset.themeset);
                        dialog.classList.add('dnone');
                    });
                });
            });
        });
    }
}


// popup modals engine
export let pops_modal = () => {

}


// open or dropdown menu
export let drop_downs = () => {

}


// system tab engine
export let tab_engine = () => {

}


// element based loader
export let div_loader = () => {

}