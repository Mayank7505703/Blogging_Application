# =========================
# Stage 1: Build application
# =========================
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven files first
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Make Maven wrapper executable
RUN chmod +x mvnw

# Copy source code
COPY src src

# Build Spring Boot application
RUN ./mvnw clean package -DskipTests


# =========================
# Stage 2: Run application
# =========================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy generated JAR
COPY --from=build /app/target/*.jar app.jar

# Railway provides PORT automatically
EXPOSE 8080

# Start Spring Boot
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar app.jar"]