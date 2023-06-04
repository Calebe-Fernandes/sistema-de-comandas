#!/bin/bash

CONTAINER_APP="backend-app-1"

# Check if the container is running
if docker ps --filter "name=${CONTAINER_APP}" --format "{{.Names}}" | grep -q "${CONTAINER_APP}"; then
    echo "Stopping and removing container: ${CONTAINER_APP}"
    sudo docker stop ${CONTAINER_APP}
    sudo docker rm ${CONTAINER_APP}
else
    echo "Container ${CONTAINER_NAME} is not running."
fi

echo "Building .jar"
./mvnw clean package -DskipTests 

echo "Moving .jar"
mv target/apirest-0.0.1.jar apirest.jar

echo "Starting the containers"
sudo docker compose up -d --build 