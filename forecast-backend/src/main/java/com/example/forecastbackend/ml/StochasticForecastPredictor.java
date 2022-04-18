package com.example.forecastbackend.ml;

import weka.classifiers.Classifier;

public class NeuralForecastPredictor extends DataBasedForecastPredictor{

    public NeuralForecastPredictor() throws Exception {
        super(new weka.classifiers.pmml.consumer.NeuralNetwork());
    }
}
