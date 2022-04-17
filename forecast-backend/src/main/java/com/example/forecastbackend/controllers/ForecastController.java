package com.example.forecastbackend.controllers;

import com.example.forecastbackend.dtos.ProcessData;
import com.example.forecastbackend.entities.Product;
import com.example.forecastbackend.respositories.ProductRepository;
import com.example.forecastbackend.respositories.StoreRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("forecast")

public class ForecastController {

    private ProductRepository productRepository;
    private StoreRepository storeRepository;

    public ForecastController(ProductRepository productRepository, StoreRepository storeRepository) {
        this.storeRepository = storeRepository ;
        this.productRepository = productRepository;
    }

    @PostMapping("process")
    public ResponseEntity<String> processSales(@RequestBody ProcessData processdata) {


        this.productRepository.saveAll(processdata.getProducts());
        this.storeRepository.saveAll(processdata.getStores());
        System.out.println(processdata.getSales());

        return new ResponseEntity<String>("New Data Processed", HttpStatus.OK);
    }

}
