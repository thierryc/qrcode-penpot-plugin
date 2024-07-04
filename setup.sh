#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

if [ -f ".nvmrc" ]; then
  echo "Found .nvmrc, attempting to switch Node version..."
  nvm use
else
  echo ".nvmrc file not found"
fi
