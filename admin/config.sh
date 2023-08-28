#!/bin/bash


function parse_config_vars(){
    [[ -f $1 ]] || { echo "$1 is not a file." >&2;return 1;}
    local line key value entry_regex
    entry_regex="^[[:blank:]]*([[:alnum:]_-]+)[[:blank:]]*=[[:blank:]]*('[^']+'|\"[^\"]+\"|[^#]+)"
    while read -r line
    do
        [[ -n $line ]] || continue
        [[ $line =~ $entry_regex ]] || continue
        key=${BASH_REMATCH[1]}
        value=${BASH_REMATCH[2]#[\'\"]} # strip quotes
        value=${value%[\'\"]}
        value=${value%${value##*[![:blank:]]}} # strip trailing spaces
        declare -g "${key}"="${value}"
    done < "$1"
}

function rofal_theme_config() {
    
    CONFIG_FILE="../hugo.toml"
    cat $CONFIG_FILE | grep "baseURL"
    return 
}