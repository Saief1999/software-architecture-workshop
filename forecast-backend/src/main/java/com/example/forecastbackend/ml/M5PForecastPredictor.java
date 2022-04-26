package com.example.forecastbackend.ml;

import weka.classifiers.Classifier;

public class M5PForecastPredictor extends DataBasedForecastPredictor{
    public M5PForecastPredictor() {
        super(new weka.classifiers.trees.M5P ());
    }
}
