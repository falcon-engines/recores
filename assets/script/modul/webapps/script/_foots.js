    // pwaengine
    function pwaengine() {
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

    pwaengine();