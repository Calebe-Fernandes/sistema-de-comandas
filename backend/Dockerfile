#
# Build stage
#
FROM maven:3.8.4-openjdk-11-slim AS build
COPY . .
RUN mvn clean package

#
# Package stage
#
FROM gcr.io/distroless/java
COPY --from=build target/apirest-0.0.1.jar apirest.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","apirest.jar"]
