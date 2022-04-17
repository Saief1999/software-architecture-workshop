package com.example.forecastbackend.respositories;

import com.example.forecastbackend.entities.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}
