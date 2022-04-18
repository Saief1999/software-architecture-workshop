package com.example.forecastbackend.ml;


public class SimpleForecastPredictor extends DataBasedForecastPredictor {
    public SimpleForecastPredictor()
    {
        super(new weka.classifiers.functions.LinearRegression());
    }
}
