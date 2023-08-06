# library Update to github
github_push_remote_update() { 
    git pull ;
    git add  . ;
    git commit -m "library-update";
    git push;
    cd ../.. ;
}