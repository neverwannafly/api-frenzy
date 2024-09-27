#!/bin/bash

export AWS_PROFILE=api-frenzy

bash pipelines/image_builder.sh

# Push Images
docker push 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.web:v1
docker push 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.api:v1
docker push 010928219493.dkr.ecr.ap-south-1.amazonaws.com/af.functions:v1

# Push Runtimes
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/f2o5a2c3
docker push public.ecr.aws/f2o5a2c3/af.runtime.node18:v1
docker push public.ecr.aws/f2o5a2c3/af.runtime.vscode-alpine:v1

## Run Data Migrations ##
TASK_ARN=$(aws ecs run-task \
  --cluster api-frenzy-prod \
  --task-definition af-api:6 \
  --overrides '{"containerOverrides":[{"name":"'"api"'","command":["'"migration"'"]}]}' \
  --launch-type EC2 \
  --query 'tasks[0].taskArn' \
  --output text)

# Wait for the task to finish
echo "Waiting for the task to finish..."
aws ecs wait tasks-stopped --cluster api-frenzy-prod --tasks $TASK_ARN

# Check if the task succeeded
EXIT_CODE=$(aws ecs describe-tasks \
  --cluster api-frenzy-prod \
  --tasks $TASK_ARN \
  --query 'tasks[0].containers[0].exitCode' \
  --output text)

if [ "$EXIT_CODE" -eq 0 ]; then
  echo "Task succeeded."
else
  echo "Task failed with exit code $EXIT_CODE."
  exit 1
fi
## Data Migrations Done ##

## Start Service Deploy ##
aws ecs update-service \
  --cluster api-frenzy-prod \
  --service frontend-service \
  --desired-count 1 \
  --force-new-deployment > deploy.log

aws ecs update-service \
  --cluster api-frenzy-prod \
  --service backend-service \
  --desired-count 1 \
  --force-new-deployment > deploy.log

aws ecs update-service \
  --cluster api-frenzy-prod \
  --service functions-service \
  --desired-count 1 \
  --force-new-deployment > deploy.log

## Service Deploy Done ##