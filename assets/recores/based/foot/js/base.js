console.log('recores - falcon engine - foot loaded');

(()=>{

    let navigation_loader_helper = () => {
        let main_menu = document.getElementById('navigates');
        main_menu.classList.remove('d-hide');
    }
 
    window.addEventListener('load', ()=> {

        if ( screen.width > 992  ) {
            navigation_loader_helper();
        }
    })
   
})()