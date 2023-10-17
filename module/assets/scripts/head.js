( function() {
    
    let mode = localStorage.getItem('theme');
    let hour = new Date().getHours();
    let days = hour >= 6 && hour < 18;

    if ( mode === 'dark'  ) {
        document.documentElement.setAttribute("data-mode", "dark");
    }
    else if ( mode === 'light'  ) {
        document.documentElement.setAttribute("data-mode", "light");
    }
    else if ( window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || days === false ) {
        document.documentElement.setAttribute("data-mode", "dark");
    }
    else {
        document.documentElement.setAttribute("data-mode", "light");
    }
})();