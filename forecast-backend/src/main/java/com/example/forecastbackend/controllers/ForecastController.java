package com.example.forecastbackend.controllers;

import com.example.forecastbackend.dtos.ProcessData;
import com.example.forecastbackend.dtos.SaleDetails;
import com.example.forecastbackend.dtos.SaleVisualisationResult;
import com.example.forecastbackend.entities.Product;
import com.example.forecastbackend.entities.Sale;
import com.example.forecastbackend.entities.Store;
import com.example.forecastbackend.exceptions.BadRequestException;
import com.example.forecastbackend.ml.DummyForecastPredictor;
import com.example.forecastbackend.ml.ForecastPredictor;
import com.example.forecastbackend.ml.StochasticForecastPredictor;
import com.example.forecastbackend.respositories.ProductRepository;
import com.example.forecastbackend.respositories.SalesRepository;
import com.example.forecastbackend.respositories.StoreRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController()
@RequestMapping("forecast")

public class ForecastController {

    private ForecastPredictor predictor;
    private ProductRepository productRepository;
    private StoreRepository storeRepository;

    private SalesRepository salesRepository;

    public ForecastController(ProductRepository productRepository, StoreRepository storeRepository,SalesRepository salesRepository)throws Exception {
        this.storeRepository = storeRepository ;
        this.productRepository = productRepository;
        this.salesRepository=salesRepository;
        var products = this.productRepository.findAll();
        var stores = this.storeRepository.findAll();
        var sales=this.salesRepository.findAll();
        Map<String, Product> productMap = new HashMap<>();
        Map<String, Store> storeMap = new HashMap<>();
        Map<String, SaleDetails> saleMap = new HashMap<>();
        for (Product product : products)
            productMap.put(product.getName(), product);
        for(Store store: stores)
            storeMap.put(store.getName(), store);
        for(Sale sale: sales)
        {
            SaleDetails saleDetails=new SaleDetails();
            saleDetails.setId(sale.getId());
            saleDetails.setQuantity(sale.getQuantity());
            saleDetails.setStoreId(sale.getStoreId());
            saleDetails.setDate(sale.getDate());
            saleDetails.setProductId(sale.getProductId());
            saleDetails.setPrice(productMap.get(sale.getProductId()).getPrice());
            saleMap.put(sale.getId(),saleDetails);
        }
        try {
            predictor=new StochasticForecastPredictor();
            predictor.train(saleMap);
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Unable to build model, using dummy model");
            predictor=new DummyForecastPredictor(5);
            predictor.train(saleMap);
        }
    }

    @PostMapping("process")
    public ResponseEntity<String> processSales(@RequestBody ProcessData processdata) {


        this.productRepository.saveAll(processdata.getProducts());
        this.storeRepository.saveAll(processdata.getStores());
        System.out.println(processdata.getSales());

        return new ResponseEntity<String>("New Data Processed", HttpStatus.OK);
    }

    @GetMapping("process")
    public ResponseEntity<SaleVisualisationResult> forecast() throws Exception
    {

        Date date=new Date();
        return new ResponseEntity<SaleVisualisationResult>(new SaleVisualisationResult(predictor.forecastSales("1","1", date,50,12),
                predictor.forecastSales("1","1", date,50,12)), HttpStatus.OK);
    }
    @ExceptionHandler(BadRequestException.class)
    void handleBadRequests(BadRequestException bre, HttpServletResponse response) throws IOException {

        int respCode = (bre.errCode == BadRequestException.ID_NOT_FOUND) ?
                HttpStatus.NOT_FOUND.value() : HttpStatus.BAD_REQUEST.value() ;
        response.sendError(respCode, bre.errCode + ":" + bre.getMessage());
    }
    //    {
    //        predicted: [
    //        {
    //            Forecast1,
    //                    Forecast2...
    //        }
    //                ],
    //        actualData: [
    //        Forecast1...,
    //        Forecast...
    //                ]
    //    }

}
