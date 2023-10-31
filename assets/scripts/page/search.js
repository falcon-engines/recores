
let get_uri_param = (params) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let value = urlParams.get(params);
    return value;
}


let search_engine = async( query ) => {
    let json_link = await fetch('index.json');
    let json_data = await json_link.json();
    let data_main = [];

    for (var i = 0; i < json_data.length; i++){
        if ( json_data[i].title.includes(query) ){
            if ( json_data[i].section.length > 0 ) {
                data_main[json_data[i].section] = [i];
                data_main[json_data[i].section][i] = {
                    title       : json_data[i].title,
                    links       : json_data[i].uri,
                    description : json_data[i].description,
                }
            }
            else {
                data_main['general'] = [i];
                data_main['general'][i] = {
                    title       : json_data[i].title,
                    links       : json_data[i].uri,
                    description : json_data[i].description,
                }
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
( async() => {
    let query_arg = get_uri_param('q');
    let search_ls = await search_engine(query_arg);
    if ( Object.keys(search_ls).length > 0 ) {
        result_found(search_ls);
    }
    else {
        result_losed();
    }
})();