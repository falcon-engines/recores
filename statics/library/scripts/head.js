( function() {
    
    let mode = localStorage.getItem("theme");
    let hour = new Date().getHours();
    let days = hour > 6 && hour < 20;

    if ( mode === 'dark' || days === false || window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
        document.querySelector('html').dataset.theme = 'dark';
    }
    else {
        document.querySelector('html').dataset.theme = 'light';
    }
    
})();