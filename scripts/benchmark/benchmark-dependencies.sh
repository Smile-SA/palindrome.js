#!/bin/bash

# Set sudo prefix depending on situation
declare -g cmd_prefix

# Update the package manager
sudo apt update -y

# Install wget if not already installed
if [[ -z "$(command -v wget)" ]]; then
    sudo apt install -y wget
    jq --version
fi

# Install google-chrome
if [[ "${PALINDROME_BENCH_BROWSER}" == 'chromium' ]]; then
    if [ -z "$(command -v chromium)" ]; then
        export TZ=Europe/Paris 
        ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
        sudo apt install chromium-browser -y
        sudo snap install chromium
    fi
fi

# Install fuser command
if [[ -z "$(command -v fuser)" ]]; then
    sudo apt install psmisc -y
fi

# Install xvfb
if [[ -z "$(command -v xvfb-run)" ]]; then
    sudo apt install xvfb -y
fi

# Install jq if not already installed
if [[ -z "$(command -v jq)" ]]; then
    sudo apt install -y jq
    jq --version
fi

# Install Firefox if not already installed
if [[ -z "$(command -v firefox)" ]]; then
    sudo add-apt-repository ppa:mozillateam/ppa -y
    sudo apt update
    echo -e 'Package: *\nPin: release o=LP-PPA-mozillateam\nPin-Priority: 1001' | sudo tee /etc/apt/preferences.d/mozilla-firefox
    export TZ=Europe/Paris 
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
    sudo apt install -y firefox
fi
