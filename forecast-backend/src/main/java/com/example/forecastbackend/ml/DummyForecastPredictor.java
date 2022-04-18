package com.example.forecastbackend.ml;

import com.example.forecastbackend.entities.Forecast;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DummyForecastPredictor implements  ForecastPredictor
{
    private int value;
    public DummyForecastPredictor(int value)
    {
        this.value=value;
    }

    public List<Forecast>  forecastSales(String productId, String storeId, Date date,double price, int months)
    {
        List<Forecast> predictions = new ArrayList<>(months);
        for(int i=0;i<months;i++)
        {
            Forecast forecast = new Forecast();
            forecast.setProductId(productId);
            forecast.setStoreId(storeId);
            LocalDate futureDate =date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().plusMonths(i+1);
            forecast.setDate(Date.from(futureDate.atStartOfDay(ZoneId.systemDefault()).toInstant()));
            forecast.setNbSales(value);
            predictions.add(forecast);
        }
        return predictions;
    }
}
