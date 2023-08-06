#!/bin/bash


function github_push_all_module() {
    github_push_engine_repo;
    github_push_content_repo;
    github_push_themes_based;
    github_push_themes_marbel;
    github_push_plugins_project;
    github_push_plugins_blocks;
    github_push_plugins_users;
    github_push_plugins_course;
    github_push_plugins_news;
    github_push_plugins_report;
    github_push_plugins_event;
    github_push_plugins_tutorial;
    github_push_plugins_documentation;
}