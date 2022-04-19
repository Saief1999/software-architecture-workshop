package com.example.forecastbackend.ml;

public class MeanForecastPredictor extends DataBasedForecastPredictor {
    public MeanForecastPredictor()
    {
        super(new weka.classifiers.rules.ZeroR());
    }
}
