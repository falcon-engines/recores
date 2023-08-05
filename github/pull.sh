#!/bin/bash

# master directory pull
git pull;


# public directory pull
cd public;
git pull;
cd .. ;


# Corest theme pull
if [ -d "themes/based" ]; then
    cd themes/based/ ;
    git pull ;
    cd .. ; 
    cd .. 
    echo "Falcon Based themes synchronized"
fi


# Porject plugins pull
if [ -d "themes/marbel" ]; then
    cd themes/marbel/ ;
    git pull ;
    cd .. ; 
    cd .. 
    echo "Falcon marbel themes synchronized"
fi


# Porject plugins pull
if [ -d "themes/project" ]; then
    cd themes/project/ ;
    git pull ;
    cd .. ; 
    cd .. 
    echo "Falcon project plugins synchronized"
fi


# Update blocks plugins repository
if [ -d "themes/blocks" ]; then
    cd themes/blocks/ ;
    git pull ;
    cd .. ; 
    cd .. ;
    echo "Falcon blocks plugins synchronized"
fi


# Update user plugins repository
if [ -d "themes/users" ]; then
    cd themes/users/ ;
    git pull ;
    cd .. ; 
    cd .. ;
    echo "Falcon users plugins synchronized"
fi


# Update course plugins repository
if [ -d "themes/course" ]; then
    cd themes/course/ ;
    git pull ;
    cd .. ; 
    cd .. ;
    echo "Falcon course plugins synchronized"
fi


# Update news plugins repository
if [ -d "themes/news" ]; then
    cd themes/news/ ;
    git pull ;
    cd .. ; 
    cd .. ;
    echo "Falcon news plugins synchronized"
fi


# Update report plugins repository
if [ -d "themes/report" ]; then
    cd themes/report/ ;
    git pull ;
    cd .. ; 
    cd .. ;
    echo "Falcon report plugins synchronized"
fi


# Update report users repository
if [ -d "themes/users" ]; then
    cd themes/users/ ;
    git pull ;
    cd .. ; 
    cd .. ;
    echo "Falcon users plugins synchronized"
fi


# Update tutorial users repository
if [ -d "themes/howto" ]; then
    cd themes/howto/ ;
    git pull ;
    cd .. ; 
    cd .. ;
    echo "Falcon tutorial plugins synchronized"
fi


# Update tutorial users repository
if [ -d "themes/docus" ]; then
    cd themes/docus/ ;
    git pull ;
    cd .. ; 
    cd .. ;
    echo "Falcon tutorial plugins synchronized"
fi
