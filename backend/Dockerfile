#
# Build stage
#
FROM eclipse-temurin:17-jdk-alpine AS build
COPY . .
RUN mvn clean package

#
# Package stage
#
FROM openjdk:11-jre-slim
COPY --from=build target/apirest-0.0.1.jar apirest.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","apirest.jar"]
