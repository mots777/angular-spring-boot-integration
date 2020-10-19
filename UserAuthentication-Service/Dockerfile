# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
LABEL maintainer="mots015@gmail.com"

# Add a volume pointing to /tmp
VOLUME /tmp

# Make port 8089 available to the world outside this container
EXPOSE 8089

# The application's jar file
ARG JAR_FILE=target/UserAuthentication-Service-0.0.1-SNAPSHOT.jar

# Add the application's jar to the container
ADD ${JAR_FILE} UserAuthentication-Service-0.0.1-SNAPSHOT.jar

# Run the jar file 
ENTRYPOINT ["java","-Xmx200m", "-jar", "/UserAuthentication-Service-0.0.1-SNAPSHOT.jar"]