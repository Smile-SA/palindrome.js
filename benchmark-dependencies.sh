#!/bin/bash

# Update the package manager
sudo apt-get update

# Install Node.js LTS version if not already installed
if [ -z "$(command -v node)" ]; then
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    node -v
fi

# Install Yarn if not already installed
if [ -z "$(command -v yarn)" ]; then
    curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install -y yarn
fi

# Install Firefox if not already installed
if [ -z "$(command -v firefox)" ]; then
    sudo apt-get install -y firefox xvfb
    Xvfb :1 -screen 0 1024x768x16 &
    export DISPLAY=:1
fi