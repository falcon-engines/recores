#!/bin/bash

function github_push_all() {
    github_push_engine_sites ;
    github_push_public_sites ;
    github_push_themes_marbel ;
    github_push_module_admin ;
    github_push_article_based ;
    github_push_module_based ;
    github_push_module_project ;
    github_push_module_blocks ;
    github_push_module_blog;
    github_push_module_users ;
    github_push_module_course ;
    github_push_module_news ;
    github_push_module_report ;
    github_push_module_event ;
    github_push_module_tutorial ;
    github_push_module_documentation ;
}


function github_pull_all() {
    github_pull_engine_sites ;
    github_pull_public_sites ;
    github_pull_themes_marbel ;
    github_pull_module_admin ;
    github_pull_article_based ;
    github_pull_module_based ;
    github_pull_module_project ;
    github_pull_module_blocks ;
    github_pull_module_blog ;
    github_pull_module_users ;
    github_pull_module_course ;
    github_pull_module_news ;
    github_pull_module_report ;
    github_pull_module_event ;
    github_pull_module_tutorial ;
    github_pull_module_documentation ;
}