function mathtext() {

    let mathex = document.createElement( 'script' );
    mathex.setAttribute( 'id', 'mathjax-feature');
    mathex.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_SVG";
    mathex.setAttribute( 'defer', '');
    this.base_jsx.after( mathex );

    mathex.onload = ()=> {
        MathJax.Hub.Register.StartupHook("End",function () {
            MathJax.Hub.Config({
                showMathMenu: false, //disables context menu
                tex2jax: {
                inlineMath: [ ['$','$'], ['\\(','\\)'] ]
               }
            });
        });
    }
}
mathtext();