save the following as application.properties and fill in the DB_USERNAME and DB_PASSWORD

logging.level.org.springframework.jdbc.core=DEBUG

spring.datasource.url=jdbc:mysql://localhost:3306/spring_to_do
spring.datasource.username={DB_USERNAME}
spring.datasource.password={DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update