package com.example.forecastbackend.ml;

import com.example.forecastbackend.dtos.ProcessData;
import com.example.forecastbackend.dtos.SaleDetails;
import com.example.forecastbackend.entities.Forecast;
import weka.classifiers.Classifier;
import weka.core.DenseInstance;
import weka.core.Instance;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

class Triplet<A,B,C>
{
    A first;
    B second;
    C third;

    public Triplet(A first, B second, C third) {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    public static <A,B,C> Triplet<A,B,C> of(A a,B b,C c)
    {
        return new Triplet<A,B,C>(a,b,c);
    }

}

class Quadruplet<A,B,C,D>
{
    A first;
    B second;
    C third;
    D fourth;

    public Quadruplet(A first, B second, C third,D fourth) {
        this.first = first;
        this.second = second;
        this.third = third;
        this.fourth = fourth;
    }

    public static <A,B,C,D> Quadruplet<A,B,C,D> of(A a,B b,C c,D d)
    {
        return new Quadruplet<A,B,C,D>(a,b,c,d);
    }

}

public class SimpleForecastPredictor implements ForecastPredictor {
    private Classifier classifier = new weka.classifiers.functions.LinearRegression();
    private Transformer transformer = new Transformer();
    private DateReducer dateReducer = new DateReducer();

    public SimpleForecastPredictor train(Map<String, SaleDetails> mapper) throws Exception {
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
