#!/bin/bash

# Set sudo prefix depending on situation
declare -g cmd_prefix
if [[ -n "${GITLAB_CI}" ]]; then
    cmd_prefix=""
else
    cmd_prefix="sudo"
fi

# Update the package manager
${cmd_prefix} apt update -y

# Install wget if not already installed
if [[ -z "$(command -v wget)" ]]; then
    ${cmd_prefix} apt install -y wget
    jq --version
fi

# Install google-chrome
if [[ "${PALINDROME_BENCH_BROWSER}" == 'chromium' ]]; then
    if [ -z "$(command -v chromium)" ]; then
        export TZ=Europe/Paris 
        ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
        ${cmd_prefix} apt install chromium-browser -y
        ${cmd_prefix} snap install chromium
    fi
fi

# Install fuser command
if [[ -z "$(command -v fuser)" ]]; then
    ${cmd_prefix} apt install psmisc -y
fi

# Install xvfb
if [[ -z "$(command -v xvfb-run)" ]]; then
    ${cmd_prefix} apt install xvfb -y
fi

# Install jq if not already installed
if [[ -z "$(command -v jq)" ]]; then
    ${cmd_prefix} apt install -y jq
    jq --version
fi

# Install Firefox if not already installed
if [[ -z "$(command -v firefox)" ]]; then
    ${cmd_prefix} apt install -y firefox
fi