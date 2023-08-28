#!/bin/bash

function github_falcon_installation_module() {
    git clone git@github.com:uin-ipi/uin-ipi.github.io.git public ;
    git clone git@github.com:rozard-falcon/devel.git admin;
    cd themes;
    git clone git@github.com:rozard-falcon/marbel.git ;
    git clone git@github.com:rozard-falcon/based.git ;
    git clone git@github.com:rozard-falcon/blocks.git ;
    git clone git@github.com:rozard-falcon/course.git ;
    git clone git@github.com:rozard-falcon/docus.git ;
    git clone git@github.com:rozard-falcon/event.git ;
    git clone git@github.com:rozard-falcon/howto.git ;
    git clone git@github.com:rozard-falcon/news.git ;
    git clone git@github.com:rozard-falcon/project.git ;
    git clone git@github.com:rozard-falcon/report.git ;
    git clone git@github.com:rozard-falcon/users.git ;
}