#!/bin/bash


# MASTER LIBRARY
source ./extractor.sh

# GITHUB LIBRARY
source ./github/libs.sh
source ./github/init.sh
source ./github/push.sh
source ./github/pull.sh
source ./github/main.sh






# FUNCTIONS

function rofal_banner() {
clear;
echo "
--------------------------------------------------------------+
|                                                             |      
|   ROFAL - ROZARD FALCON PMS                                 |          
|   Swiss Army Knife For Public Data Management System        |
|                                                             |
|-------------------------------------------------------------|
|   Controller | Command line interface                       |  
|-------------------------------------------------------------|
|   Developer  | Al Muhdil Karim ( al.muhdil.0@gmail.com )    |
|-------------------------------------------------------------|
|   License    | Copyright 2019-2023 @ Lektor Media Utama     |
--------------------------------------------------------------+

Action option available, please select bellow by used this number:
    1. Update All Module and Content ( Github )
";
}


function rofal_action() {

    read -p "insert your action number : " ACTION;

    if [ $ACTION == 1 ]; then
        github_push_all_module;
    fi
}



function rofal_init() {
    rofal_banner;
    rofal_action;
}
rofal_init;