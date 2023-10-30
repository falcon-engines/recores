let get_uri_param = (params) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let value = urlParams.get(params);
    return value;
}

/** main process */
( function() {

    let page_type = get_uri_param('type');
    let query_arg = get_uri_param('q');

    console.log(page_type);
    console.log(query_arg);

})();

