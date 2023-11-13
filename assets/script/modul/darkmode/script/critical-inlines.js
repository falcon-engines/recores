(() => {
    
    let get_dark_mode = localStorage.getItem('theme');
    let get_hour_nows = new Date().getHours();
    let get_days_nows = get_hour_nows >= 6 && get_hour_nows < 18;

    if ( get_dark_mode === 'dark'  ) {
        document.documentElement.setAttribute("data-mode", "dark");
    }
    else if ( get_dark_mode === 'light'  ) {
        document.documentElement.setAttribute("data-mode", "light");
    }
    else if ( window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || get_days_nows == false ) {
        document.documentElement.setAttribute("data-mode", "dark");
    }
    else {
        document.documentElement.setAttribute("data-mode", "light");
    }

})();


