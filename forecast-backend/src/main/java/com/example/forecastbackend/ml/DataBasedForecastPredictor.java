package com.example.forecastbackend.ml;

import com.example.forecastbackend.dtos.SaleDetails;
import com.example.forecastbackend.entities.Forecast;
import weka.classifiers.Classifier;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class DataBasedForeCastPredictor  implements ForecastPredictor
{
    private Classifier classifier;
    private Transformer transformer = new Transformer();
    private DateReducer dateReducer = new DateReducer();
    public DataBasedForeCastPredictor(Classifier classifier) {
        this.classifier = classifier;
    }

    public DataBasedForeCastPredictor train(Map<String, SaleDetails> mapper) throws Exception {
        var dataset=transformer.transform(dateReducer.reduce(mapper));
        classifier.buildClassifier(dataset);
        return this;
    }

    public List<Forecast> forecastSales(String productId, String storeId, Date date,double price, int months) throws Exception {
        List<Forecast> predictions = new ArrayList<>(months);
        for(int i=0;i<months;i++)
        {
            Forecast forecast = new Forecast();
            forecast.setProductId(productId);
            forecast.setStoreId(storeId);
            LocalDate futureDate = forecast.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().plusMonths(i+1);
            var newDate=Date.from(futureDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
            forecast.setDate(newDate);
            var saleDetails= new SaleDetails();
            saleDetails.setPrice(price);
            saleDetails.setStoreId(storeId);
            saleDetails.setProductId(productId);
            saleDetails.setDate(newDate);
            forecast.setNbSales((int)Math.round(classifier.classifyInstance(transformer.transform(saleDetails))));
            predictions.add(forecast);
        }
        return predictions;

    }
}
