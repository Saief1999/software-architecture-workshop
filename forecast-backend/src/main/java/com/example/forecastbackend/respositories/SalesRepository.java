package com.example.forecastbackend.respositories;

import com.example.forecastbackend.entities.Sale;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface SalesRepository extends MongoRepository<Sale, String> {
}
