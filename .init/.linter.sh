#!/bin/bash
cd /tmp/kavia/workspace/code-generation/bike-catalogue-6297-6306/frontend_bike_catalogue
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

