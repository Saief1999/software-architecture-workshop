package com.example.forecastbackend.ml;

import com.example.forecastbackend.dtos.SaleDetails;
import com.example.forecastbackend.entities.Forecast;
import weka.classifiers.Classifier;
import weka.core.Attribute;
import weka.core.Instances;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class DataBasedForecastPredictor implements ForecastPredictor
{
    protected Classifier classifier;
    protected Transformer transformer = new Transformer();
    protected DateReducer dateReducer = new DateReducer();
    public DataBasedForecastPredictor(Classifier classifier) {
        this.classifier = classifier;
    }

    public DataBasedForecastPredictor train(Map<String, SaleDetails> mapper) throws Exception {
        var dataset=transformer.transform(dateReducer.reduce(mapper));
        classifier.buildClassifier(dataset);
        return this;
    }

    public List<Forecast> forecastSales(String productId, String storeId, Date date,double price, int months) throws Exception {
        ArrayList<Forecast> predictions = new ArrayList<>(months);
        Instances dataset= new Instances("prediction", (ArrayList<Attribute>) transformer.getAttributes(),2000);
        dataset.setClassIndex(transformer.getClassIndex());
        for(int i=0;i<months;i++)
        {
            Forecast forecast = new Forecast();
            forecast.setProductId(productId);
            forecast.setStoreId(storeId);
            LocalDate futureDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().plusMonths(i+1);
            var newDate=Date.from(futureDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
            forecast.setDate(newDate);
            var saleDetails= new SaleDetails();
            saleDetails.setPrice(price);
            saleDetails.setStoreId(storeId);
            saleDetails.setProductId(productId);
            saleDetails.setDate(newDate);
            var instance=transformer.transform(saleDetails);
            dataset.add(instance);
            instance.setDataset(dataset);
            forecast.setNbSales((int)Math.round(classifier.classifyInstance(instance)));
            predictions.add(forecast);
        }
        return predictions;

    }
}
