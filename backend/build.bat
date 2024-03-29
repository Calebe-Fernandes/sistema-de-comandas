@echo off

IF EXIST "apirest.jar" (
    del "apirest.jar"
)

docker build -t build-jar-inside-docker-image -f Dockerfile.build .
docker create -it --name build-jar-inside-docker build-jar-inside-docker-image bash
docker cp build-jar-inside-docker:/target/apirest-0.0.1.jar apirest.jar
docker rm -f build-jar-inside-docker
