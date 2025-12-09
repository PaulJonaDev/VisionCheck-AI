#!/usr/bin/env bash
set -e
docker compose -f infra/docker/docker-compose.yml up --build

