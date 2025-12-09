#!/usr/bin/env bash
set -e
curl -s -X POST http://localhost:3001/upload -H "Content-Type: application/json" -d '{"imageUri":"seed://image","meta":{"source":"seed"}}'

