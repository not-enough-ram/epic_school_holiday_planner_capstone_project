FROM openjdk:15

MAINTAINER Jonathan Heyer <jonathan.heyer@gmail.com>

ADD /target/epic-holiday-planner.jar app.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$MONGO_DB_URI -jar /app.jar" ]