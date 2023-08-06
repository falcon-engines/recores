#!/bin/bash



function github_push_all_module() {
    github_push_engine_sites ;
    github_push_public_sites ;
    github_push_themes_marbel ;
    github_push_module_based ;
    github_push_module_project ;
    github_push_module_blocks ;
    github_push_module_users ;
    github_push_module_course ;
    github_push_module_news ;
    github_push_module_report ;
    github_push_module_event ;
    github_push_module_tutorial ;
    github_push_module_documentation ;
}