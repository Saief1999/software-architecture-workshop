package com.example.forecastbackend.ml;

import com.example.forecastbackend.entities.Forecast;

import java.util.Date;
import java.util.List;

public interface ForecastPredictor {
    public List<Forecast> forecastSales(String productId, String storeId, Date date,double price, int months) throws Exception;

}
