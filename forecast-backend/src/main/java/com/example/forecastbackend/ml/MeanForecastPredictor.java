package com.example.forecastbackend.ml;

import com.example.forecastbackend.entities.Forecast;

import java.util.Date;
import java.util.List;

public class MeanForecastPredictor implements ForecastPredictor
{

    @Override
    public List<Forecast> forecastSales(String productId, String storeId, Date date,double price, int months) {
        return null;
    }
}
