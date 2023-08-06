#!/bin/bash


# MASTER LIBRARY
source ./config.sh
source ./server.sh

# GITHUB LIBRARY
source ./github/sets.sh
source ./github/push.sh
source ./github/pull.sh
source ./github/main.sh



# FUNCTIONS

function rofal_banner() {
clear;
echo "
--------------------------------------------------------------+
|                                                             |      
|   ROFAL - ROZARD FALCON DMS                                 |          
|   Swiss Army Knife For Data Management System ( Public )    |
|                                                             |
|-------------------------------------------------------------|
|   Controller | Command line interface                       |  
|-------------------------------------------------------------|
|   Developer  | Al Muhdil Karim ( al.muhdil.0@gmail.com )    |
|-------------------------------------------------------------|
|   License    | Copyright 2019-2023 @ Lektor Media Utama     |
--------------------------------------------------------------+

";
}


function rofal_option() {
echo " 
Action option available, please select bellow by used this number:

    1. Start development Server
    2. Start production server ( local )
    3. Push all to Github
    4. Pull all from Github
";
}
function rofal_action() {

    read -p "insert your action number : " ACTION;

    if [ $ACTION == 1 ]; then
        rofal_banner;
        devel_server;
    fi
    if [ $ACTION == 2 ]; then
        rofal_banner;
        devel_server;
    fi
    if [ $ACTION == 3 ]; then
        rofal_banner;
        github_push_all;
    fi
    if [ $ACTION == 4 ]; then
        rofal_banner;
        github_pull_all;
    fi
    clear;
    rofal_main;
}

function rofal_main() {
    rofal_banner;
    rofal_option;
    rofal_action;
}


function rofal_init() {
    rofal_main;
}
rofal_init;