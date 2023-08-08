#!/bin/bash

## LIBRARY

function github_pull_remote_update() { 
    git pull ;
    cd ../.. ; 
}


## FUNCTION

# pull master website engine
function github_pull_engine_sites() {
    git pull;
}

# public directory pull
function github_pull_public_sites() {
    cd .. ;
    cd public;
    git pull;
    cd .. ;
}

# pull master theme
function github_pull_themes_marbel() {
    if [ -d "themes/marbel" ]; then
        cd themes/marbel/ ;
        github_pull_remote_update
        echo "Falcon marbel themes synchronized"
    fi
}

# pull admin module
function github_pull_module_admin() {
    if [ -d "admin" ]; then
        cd admin ;
        git pull ;
        cd .. ;
        echo "Falcon Based themes synchronized"
    fi
}

# pull based module
function github_pull_module_based() {
    if [ -d "themes/based" ]; then
        cd themes/project/ ;
        github_pull_remote_update
        echo "Falcon based module synchronized"
    fi
}

# pull project module
function github_pull_module_project() {
    if [ -d "themes/project" ]; then
        cd themes/project/ ;
        github_pull_remote_update
        echo "Falcon project module synchronized"
    fi
} 

# Update article module
function github_push_module_article() {
    if [ -d "themes/article" ]; then
        cd themes/article/ ;
        github_pull_remote_update
        echo "Falcon article plugins synchronized"
    fi
}

# pull blocks module
function github_pull_module_blocks() {
    if [ -d "themes/blocks" ]; then
        cd themes/blocks/ ;
        github_pull_remote_update
        echo "Falcon blocks plugins synchronized"
    fi
}

# Update blog module
function github_push_module_blog() {
    if [ -d "themes/blog" ]; then
        cd themes/blog/ ;
        github_pull_remote_update
        echo "Falcon blog plugins synchronized"
    fi
}

# pull users module
function github_pull_module_users() {
    if [ -d "themes/users" ]; then
        cd themes/users/ ;
        github_pull_remote_update
        echo "Falcon users module synchronized"
    fi
}

# pull course module
function github_pull_module_course() {
    if [ -d "themes/course" ]; then
        cd themes/course/ ;
        github_pull_remote_update ;
        echo "Falcon course module synchronized"
    fi
}

# pull news module
function github_pull_module_news() {
    if [ -d "themes/news" ]; then
        cd themes/news/ ;
        github_pull_remote_update
        echo "Falcon news plugins synchronized"
    fi
}

# pull report module 
function github_pull_module_report() {
    if [ -d "themes/report" ]; then
        cd themes/report/ ;
        github_pull_remote_update
        echo "Falcon report plugins synchronized"
    fi
}

# pull event module
function github_pull_module_event() {
    if [ -d "themes/event" ]; then
        cd themes/event/ ;
        github_pull_remote_update
        echo "Falcon users plugins synchronized"
    fi
}

# pull tutorial module
function github_pull_module_tutorial() {
    if [ -d "themes/howto" ]; then
        cd themes/howto/ ;
        github_pull_remote_update
        echo "Falcon tutorial plugins synchronized"
    fi
}

# pull documentation module
function github_pull_module_documentation() {
    if [ -d "themes/docus" ]; then
        cd themes/docus/ ;
        github_pull_remote_update
        echo "Falcon tutorial plugins synchronized"
    fi
}