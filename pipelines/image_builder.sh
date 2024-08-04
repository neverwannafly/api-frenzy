#!/bin/bash

export AWS_PROFILE=api-frenzy

aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 010928219493.dkr.ecr.ap-south-1.amazonaws.com/

curr_dir=$(pwd)

# Create both dev and prod images for web
cd $curr_dir/services/web/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.web-prod:v1 . --build-arg ENV=production
cd $curr_dir/services/web/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.web:v1 .
cd $curr_dir/services/api/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.api:v1 .
cd $curr_dir/services/nginx/ && echo $(pwd) && DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t af.nginx:v1 .

docker tag af.web-prod:v1 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.web:v1
docker tag af.api:v1 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.api:v1
docker tag af.nginx:v1 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.nginx:v1

docker push 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.web:v1
docker push 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.api:v1
docker push 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.nginx:v1
