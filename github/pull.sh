#!/bin/bash

# master directory pull
function github_pull_master_engine() {
    git pull;
}


# public directory pull
function github_pull_master_public() {
    cd public;
    git pull;
    cd .. ;
}


# based theme pull
function github_pull_based_theme() {

    if [ -d "themes/based" ]; then
        cd themes/based/ ;
        git pull ;
        cd .. ; 
        cd .. 
        echo "Falcon Based themes synchronized"
    fi
}

# pull master theme
function github_pull_master_theme() {
    if [ -d "themes/marbel" ]; then
        cd themes/marbel/ ;
        git pull ;
        cd .. ; 
        cd .. 
        echo "Falcon marbel themes synchronized"
    fi
}


# pull project plugins
function github_pull_plugin_project() {
    if [ -d "themes/project" ]; then
        cd themes/project/ ;
        git pull ;
        cd .. ; 
        cd .. 
        echo "Falcon project plugins synchronized"
    fi
} 


# pull project blocks
function github_pull_plugin_blocks() {
    if [ -d "themes/blocks" ]; then
        cd themes/blocks/ ;
        git pull ;
        cd .. ; 
        cd .. ;
        echo "Falcon blocks plugins synchronized"
    fi
}




# pull project users
function github_pull_plugin_users() {
    if [ -d "themes/users" ]; then
        cd themes/users/ ;
        git pull ;
        cd .. ; 
        cd .. ;
        echo "Falcon users plugins synchronized"
    fi
}




# pull project course
function github_pull_plugin_course() {
    if [ -d "themes/course" ]; then
        cd themes/course/ ;
        git pull ;
        cd .. ; 
        cd .. ;
        echo "Falcon course plugins synchronized"
    fi
}



# pull project news
function github_pull_plugin_news() {
    if [ -d "themes/news" ]; then
        cd themes/news/ ;
        git pull ;
        cd .. ; 
        cd .. ;
        echo "Falcon news plugins synchronized"
    fi
}



# pull project report
function github_pull_plugin_report() {

    if [ -d "themes/report" ]; then
        cd themes/report/ ;
        git pull ;
        cd .. ; 
        cd .. ;
        echo "Falcon report plugins synchronized"
    fi
}




# pull project users
function github_pull_plugin_users() {
    if [ -d "themes/users" ]; then
        cd themes/users/ ;
        git pull ;
        cd .. ; 
        cd .. ;
        echo "Falcon users plugins synchronized"
    fi
}



# pull project howto
function github_pull_plugin_howto() {
    if [ -d "themes/howto" ]; then
        cd themes/howto/ ;
        git pull ;
        cd .. ; 
        cd .. ;
        echo "Falcon tutorial plugins synchronized"
    fi
}



# pull project docus
function github_pull_plugin_docus() {
    # Update tutorial users repository
    if [ -d "themes/docus" ]; then
        cd themes/docus/ ;
        git pull ;
        cd .. ; 
        cd .. ;
        echo "Falcon tutorial plugins synchronized"
    fi
}
