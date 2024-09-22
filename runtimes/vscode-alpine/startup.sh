#!/bin/bash

# Start the code-server as 'coder' user
su vscode -c "code-server --bind-addr 0.0.0.0:8443 --auth none /home/vscode/workspace"
