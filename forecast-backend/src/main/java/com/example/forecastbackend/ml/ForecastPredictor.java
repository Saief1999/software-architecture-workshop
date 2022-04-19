package com.example.forecastbackend.ml;

import com.example.forecastbackend.dtos.SaleDetails;
import com.example.forecastbackend.entities.Forecast;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface ForecastPredictor {
    public List<Forecast> forecastSales(String productId, String storeId, Date date,double price, int months) throws Exception;
    public ForecastPredictor train(Map<String, SaleDetails> mapper) throws Exception;

}
