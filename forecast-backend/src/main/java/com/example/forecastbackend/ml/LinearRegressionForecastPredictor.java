package com.example.forecastbackend.ml;


public class LinearRegressionForecastPredictor extends DataBasedForecastPredictor {
    public LinearRegressionForecastPredictor()
    {
        super(new weka.classifiers.functions.LinearRegression());
    }
}
