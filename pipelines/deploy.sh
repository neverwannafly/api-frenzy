#!/bin/bash

export AWS_PROFILE=api-frenzy

bash pipelines/image_builder.sh

aws ecs update-service \
  --cluster api-frenzy-prod \
  --service frontend-service \
  --desired-count 1 \
  --force-new-deployment > frontend-service.log

aws ecs update-service \
  --cluster api-frenzy-prod \
  --service backend-service \
  --desired-count 1 \
  --force-new-deployment > backend-service.log