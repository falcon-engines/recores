#!/bin/bash


## LIBRARY

# update plugins to github
function github_push_remote_update() { 
    git pull ;
    git add  . ;
    git commit -m "library-update";
    git push;
    cd ../.. ;
}


## FUNCTION

# Update engine repository
function github_push_engine_repo () {
    git pull ;
    git add  . ;
    git commit -m "engine-update";
    git push ;
    echo "Falcon engine is update";
}

# Update website repository
function github_push_content_repo() {
    cd ../;
    cd public ;
    git pull ;
    cd ..;
    rm -fr public/* ;
    hugo;
    cd public ;
    git add  . ;
    git commit -m "data-update";
    git push;
    cd .. ;
    echo "Falcon web content is update";
}

# Update based theme repository
function github_push_themes_based() {
    if [ -d "themes/based" ]; then
        cd themes/based/ ;
        github_push_remote_update;
        echo "Falcon based themes is update";
    fi
}

# Update marbel theme repository
function github_push_themes_marbel() {
    if [ -d "themes/marbel" ]; then
        cd themes/marbel/ ;
        github_push_remote_update;
        echo "Falcon marbel themes is update";
    fi
}

# Update project plugins repository
function github_push_plugins_project() {
    if [ -d "themes/project" ]; then
        cd themes/project/ ;
        github_push_remote_update;
        echo "Falcon project plugins is update";
    fi
}

# Update blocks plugins repository
function github_push_plugins_blocks() {
    if [ -d "themes/blocks" ]; then
        cd themes/blocks/ ;
        github_push_remote_update;
        echo "Falcon blocks plugins is update";
    fi
}

# Update user plugins module
function github_push_plugins_users() {
    if [ -d "themes/users" ]; then
        cd themes/users;
        github_push_remote_update;
        echo "Falcon users plugin is update";
    fi
}

# Update course plugins module
function github_push_plugins_course() {
    if [ -d "themes/course" ]; then
        cd themes/course;
        github_push_remote_update;
        echo "Falcon course plugin is update";
    fi
}

# Update news plugins module
function github_push_plugins_news() {
    if [ -d "themes/news" ]; then
        cd themes/news;
        github_push_remote_update;
        echo "Falcon course plugin is update" ;
    fi
}

# Update report plugins module
function github_push_plugins_report() {
    if [ -d "themes/report" ]; then
        cd themes/report ;
        github_push_remote_update ;
        echo "Falcon report plugin is update";
    fi
}

# Update event plugins module
function github_push_plugins_event() {
    if [ -d "themes/event" ]; then
        cd themes/event ;
        github_push_remote_update ;
        echo "Falcon event plugin is update" ;
    fi
}

# Update tutorial plugins module
function github_push_plugins_tutorial() {
    if [ -d "themes/howto" ]; then
        cd themes/howto ;
        github_push_remote_update ;
        echo "Falcon tutorial plugin is update" ;
    fi
}

# Update documentation plugins module
function github_push_plugins_documentation() {
    if [ -d "themes/docus" ]; then
        cd themes/docus ;
        github_push_remote_update ;
        echo "Falcon documentation plugin is update" ;
    fi
}