package com.example.forecastbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories

public class ForecastBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ForecastBackendApplication.class, args);
    }

}
