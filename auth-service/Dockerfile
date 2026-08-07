# Stage 1: Build
# CHANGED: Using temurin-21 instead of 17
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
# Download dependencies first
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
# CHANGED: Using temurin-21 instead of 17
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Render assigns a port dynamically via the $PORT env variable
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:8080} -jar app.jar"]