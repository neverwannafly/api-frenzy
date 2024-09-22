#!/bin/bash

export AWS_PROFILE=api-frenzy

aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 010928219493.dkr.ecr.ap-south-1.amazonaws.com/

curr_dir=$(pwd)

# Create both dev and prod images for web
cd $curr_dir/services/web/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.web-prod:v1 . --build-arg ENV=production
cd $curr_dir/services/web/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.web:v1 .
cd $curr_dir/services/api/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.api:v1 .
cd $curr_dir/services/nginx/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.nginx:v1 .
cd $curr_dir/services/functions/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.functions:v1 .

# Runtimes
cd $curr_dir/runtimes/vscode-alpine/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.runtime.vscode-alpine:v1 .
cd $curr_dir/runtimes/node18/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.runtime.node18:v1 .

docker tag af.web-prod:v1 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.web:v1
docker tag af.api:v1 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.api:v1
docker tag af.functions:v1 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.functions:v1

docker tag af.runtime.vscode-alpine:v1 public.ecr.aws/f2o5a2c3/af.runtime.vscode-alpine:v1
docker tag af.runtime.node18:v1 public.ecr.aws/f2o5a2c3/af.runtime.node18:v1
