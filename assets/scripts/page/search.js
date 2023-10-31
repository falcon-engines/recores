
let get_uri_param = (params) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let value = urlParams.get(params);
    return value;
}


let search_engine = async ( query ) => {
    let json_link = await fetch('index.json');
    let json_data = await json_link.json();
    let data_main = [];

    for (var i = 0; i < json_data.length; i++){
        // look for the entry with a matching `code` value
        if ( json_data[i].title.includes(query) ){
            data_main['all'] = [i];
            data_main['all'][i] = {
                title       : json_data[i].title,
                links       : json_data[i].uri,
                description : json_data[i].description,
            }
            data_main[json_data[i].section] = [i];
            data_main[json_data[i].section][i] = {
                title       : json_data[i].title,
                links       : json_data[i].uri,
                description : json_data[i].description,
            }
        }
    }
    return data_main;
}


let result_found = (data) => {
    console.log(data)
}


let result_losed = () => {
    console.log('no result')
}


let make_tabmenu = ()=> {

}

let make_tabpage = ()=> {
    
}


/** main process */
( async function() {

    let query_arg = get_uri_param('q');
    let search_ls = await search_engine(query_arg);

    if ( Object.keys(search_ls).length > 0 ) {
        result_found(search_ls);
    }
    else {
        result_losed();
    }
})();

