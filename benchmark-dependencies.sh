#!/bin/bash

# Update the package manager
apt-get update -y

# Install wget
apt-get install wget -y

# Install google-chrome
if [ -z "$(command -v google-chrome)" ]; then
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
    export TZ=Europe/Paris 
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
    apt install ./google-chrome-stable_current_amd64.deb -y
fi

# Install fuser command
apt-get install psmisc -y

# Install xvfb
apt-get install xvfb -y

# Install jq if not already installed
if [ -z "$(command -v jq)" ]; then
    apt-get install -y jq
    jq --version
fi

# Install curl if not already installed
if [ -z "$(command -v curl)" ]; then
    apt-get install -y sudo curl
    curl --version
fi


# Install Node.js LTS version if not already installed
if [ -z "$(command -v node)" ]; then
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    apt-get install -y nodejs
    node -v
fi

# Install Yarn if not already installed
if [ -z "$(command -v yarn)" ]; then
    curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    apt-get update && sudo apt-get install -y yarn
fi

# Install Firefox if not already installed
if [ -z "$(command -v firefox)" ]; then
    apt-get install -y firefox xvfb
fi