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
function github_push_engine_sites() {
    git pull --all;
    git add  . ;
    git commit -m "engine-update";
    git push ;
    echo "Falcon engine is update";
}

# Update website repository
function github_push_public_sites() {
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

# Update marbel theme repository
function github_push_themes_marbel() {
    if [ -d "themes/marbel" ]; then
        cd themes/marbel/ ;
        github_push_remote_update;
        echo "Falcon marbel themes is update";
    fi
}


# Update admin module repository
function github_push_module_admin() {
    echo $PWD
    if [ -d "admin" ]; then
        cd admin ;
        git pull ;
        git add  . ;
        git commit -m "data-update";
        git push;
        cd .. ;
        echo "Falcon admin module is update";
    fi
}

# Update based module repository
function github_push_module_based() {
    if [ -d "themes/based" ]; then
        cd themes/based/ ;
        github_push_remote_update;
        echo "Falcon based themes is update";
    fi
}

# Update project module
function github_push_module_project() {
    if [ -d "themes/project" ]; then
        cd themes/project/ ;
        github_push_remote_update;
        echo "Falcon project plugins is update";
    fi
}

# Update article module repository
function github_push_article_based() {
    if [ -d "themes/article" ]; then
        cd themes/article/ ;
        github_push_remote_update;
        echo "Falcon article plugins is update";
    fi
}

# Update blocks module
function github_push_module_blocks() {
    if [ -d "themes/blocks" ]; then
        cd themes/blocks/ ;
        github_push_remote_update;
        echo "Falcon blocks plugins is update";
    fi
}

# Update blog module
function github_push_module_blog() {
    if [ -d "themes/blog" ]; then
        cd themes/blog/ ;
        github_push_remote_update;
        echo "Falcon blog plugins is update";
    fi
}

# Update user module
function github_push_module_users() {
    if [ -d "themes/users" ]; then
        cd themes/users;
        github_push_remote_update;
        echo "Falcon users plugin is update";
    fi
}

# Update course module
function github_push_module_course() {
    if [ -d "themes/course" ]; then
        cd themes/course;
        github_push_remote_update;
        echo "Falcon course plugin is update";
    fi
}

# Update news module
function github_push_module_news() {
    if [ -d "themes/news" ]; then
        cd themes/news;
        github_push_remote_update;
        echo "Falcon course plugin is update" ;
    fi
}

# Update report module
function github_push_module_report() {
    if [ -d "themes/report" ]; then
        cd themes/report ;
        github_push_remote_update ;
        echo "Falcon report plugin is update";
    fi
}

# Update event module
function github_push_module_event() {
    if [ -d "themes/event" ]; then
        cd themes/event ;
        github_push_remote_update ;
        echo "Falcon event plugin is update" ;
    fi
}

# Update tutorial module
function github_push_module_tutorial() {
    if [ -d "themes/howto" ]; then
        cd themes/howto ;
        github_push_remote_update ;
        echo "Falcon tutorial plugin is update" ;
    fi
}

# Update documentation module
function github_push_module_documentation() {
    if [ -d "themes/docus" ]; then
        cd themes/docus ;
        github_push_remote_update ;
        echo "Falcon documentation plugin is update" ;
    fi
}