FROM openjdk:17-jdk-slim

# Copy Files
WORKDIR /U/objectdetection
COPY . .
# Install
RUN ./mvnw -Dmaven.test.skip=true package
# Docker Run Command
EXPOSE 8080
CMD ["java","-jar","/U/objectdetection/target/playground-0.0.1-SNAPSHOT.jar"]