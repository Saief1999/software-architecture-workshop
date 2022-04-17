package com.example.forecastbackend.respositories;

import com.example.forecastbackend.entities.Store;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StoreRepository extends MongoRepository<Store, String> {
}
