#!/bin/bash

# Update the package manager
apt update -y

# Install wget
apt install wget -y

# Install google-chrome
if [[ "${PALINDROME_BENCH_GPU}" == false ]]; then
    if [ -z "$(command -v google-chrome)" ]; then
        wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
        export TZ=Europe/Paris 
        ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
        apt install ./google-chrome-stable_current_amd64.deb -y
    fi
fi

# Install fuser command
apt install psmisc -y

# Install xvfb
apt install xvfb -y

# Install jq if not already installed
if [[ -z "$(command -v jq)" ]]; then
    apt install -y jq
    jq --version
fi

# Install curl if not already installed
if [[ -z "$(command -v curl)" ]]; then
    apt install -y sudo curl
    curl --version
fi


# Install Node.js LTS version if not already installed
if [[ -z "$(command -v node)" ]]; then
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    apt install -y nodejs
    node -v
fi

# Install Yarn if not already installed
if [[ -z "$(command -v yarn)" ]]; then
    curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    apt update && sudo apt install -y yarn
fi

# Install Firefox if not already installed
if [[ -z "$(command -v firefox)" ]]; then
    apt install -y firefox xvfb
fi