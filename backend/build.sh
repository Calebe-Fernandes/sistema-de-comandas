#!/bin/bash

CONTAINER_APP="backend-app"

# Check if the container is running
if docker ps --filter "name=${CONTAINER_APP}-1" --format "{{.Names}}" | grep -q "${CONTAINER_APP}-1"; then
    echo "Stopping and removing container: ${CONTAINER_APP}"
    sudo docker stop ${CONTAINER_APP}-1
    sudo docker rmi ${CONTAINER_APP} --force
else
    echo "Container ${CONTAINER_NAME} is not running."
fi

echo "Building .jar"
./mvnw clean package -DskipTests 

echo "Moving .jar"
mv target/apirest-0.0.1.jar apirest.jar

echo "Starting the containers"
sudo docker compose up -d --build 