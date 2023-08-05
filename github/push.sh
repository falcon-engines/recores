#!/bin/bash

# Update engine repository
push_engine_repo () {
    git pull ;
    git add  . ;
    git commit -m "engine-update";
    git push ;
    echo "Falcon engine is update";
}

# Update website repository
push_content_repo() {
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

# library Update to github
github_repo_update() { 
    git pull ;
    git add  . ;
    git commit -m "library-update";
    git push;
    cd ../.. ;
}

# Update marbel theme repository
push_themes_marbel() {
    if [ -d "themes/marbel" ]; then
        cd themes/marbel/ ;
        github_repo_update;
        echo "Falcon marbel themes is update";
    fi
}

# Update based theme repository
push_themes_based() {
    if [ -d "themes/based" ]; then
        cd themes/based/ ;
        github_repo_update;
        echo "Falcon based themes is update";
    fi
}


# Update project plugins repository
push_plugins_project() {
    if [ -d "themes/project" ]; then
        cd themes/project/ ;
        github_repo_update;
        echo "Falcon project plugins is update";
    fi
}


# Update blocks plugins repository
push_plugins_blocks() {
    if [ -d "themes/blocks" ]; then
        cd themes/blocks/ ;
        github_repo_update;
        echo "Falcon blocks plugins is update";
    fi
}


# Update user plugins module
push_plugins_users() {

    if [ -d "themes/users" ]; then
        cd themes/users;
        github_repo_update;
        echo "Falcon users plugin is update";
    fi
}


# Update course plugins module
push_plugins_course() {
    if [ -d "themes/course" ]; then
        cd themes/course;
        github_repo_update;
        echo "Falcon course plugin is update";
    fi
}


# Update news plugins module
push_plugins_news() {
    if [ -d "themes/news" ]; then
        cd themes/news;
        github_repo_update;
        echo "Falcon course plugin is update" ;
    fi
}

# Update report plugins module
push_plugins_report() {
    if [ -d "themes/report" ]; then
        cd themes/report ;
        github_repo_update ;
        echo "Falcon report plugin is update";
    fi
}

# Update event plugins module
push_plugins_event() {
    if [ -d "themes/event" ]; then
        cd themes/event ;
        github_repo_update ;
        echo "Falcon event plugin is update" ;
    fi
}

# Update tutorial plugins module
push_plugins_tutorial() {
    if [ -d "themes/howto" ]; then
        cd themes/howto ;
        github_repo_update ;
        echo "Falcon tutorial plugin is update" ;
    fi
}

# Update documentation plugins module
push_plugins_documentation() {
    if [ -d "themes/docus" ]; then
        cd themes/docus ;
        github_repo_update ;
        echo "Falcon tutorial plugin is update" ;
    fi
}


push_engine_repo ;
push_content_repo ;
push_themes_based ;
push_themes_marbel ;
push_plugins_project ;
push_plugins_blocks ;
push_plugins_users ;
push_plugins_course ;
push_plugins_news ;
push_plugins_report ;
push_plugins_event ;
push_plugins_tutorial ;
push_plugins_documentation ;
