package com.example.forecastbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableMongoRepositories

public class ForecastBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ForecastBackendApplication.class, args);
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/products").allowedOrigins("http://localhost:4200");
                registry.addMapping("/stores").allowedOrigins("http://localhost:4200");
                registry.addMapping("/forecast").allowedOrigins("http://localhost:4200");
            }
        };
    }


}
