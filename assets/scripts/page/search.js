
let get_uri_param = (params) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let value = urlParams.get(params);
    return value;
}


let search_engine = async() => {
    let json_link = await fetch('index.json');
    let json_data = await json_link.json();
    return json_data;
}

let layout_items = ( data, target ) => {

    // prototype
    let link = document.createElement('a');
    let head = document.createElement('h1');
    let desc = document.createElement('p');

    // link data
    link.setAttribute( 'href', data.uri );
  
    // head data
    head.innerText = data.title;

    // desc data
    desc.innerText = data.description;
   
    // builders
    target.appendChild(link);
    link.appendChild(head);
    link.appendChild(desc);
}

let result_found = (data, query) => {

    for (var i = 0; i < data.length; i++){
        if ( data[i].title.includes(query) ){
            if ( data[i].section.length > 0 ) {
                target = document.getElementById('tab-search-'+data[i].section);
                layout_items( data[i] ,target );
            }
            else {
                target = document.getElementById('tab-search-general');
                layout_items( data[i] ,target );
            }
        }
    }
}




let result_losed = () => {
    console.log('no result')
}


let make_tabmenu = ()=> {

}

let make_tabpage = ()=> {
    
}


/** main process */
( async() => {
    let query_arg = get_uri_param('q');
    let search_ls = await search_engine(query_arg);
    if ( search_ls.length > 0 ) {
        result_found(search_ls, query_arg);
    }
    else {
        result_losed();
    }
})();