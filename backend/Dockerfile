#
# Build stage
#
FROM maven:3.1.0-jdk-11-alpine AS build
COPY . .
RUN mvn clean package

#
# Package stage
#
FROM openjdk:11-jre-slim
COPY --from=build target/apirest-0.0.1.jar apirest.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","apirest.jar"]
