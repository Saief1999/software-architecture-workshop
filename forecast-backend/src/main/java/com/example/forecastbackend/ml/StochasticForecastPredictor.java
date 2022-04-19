package com.example.forecastbackend.ml;

import com.example.forecastbackend.dtos.SaleDetails;

import java.util.Map;

public class StochasticForecastPredictor extends DataBasedForecastPredictor{
    private boolean trained=false;
    public StochasticForecastPredictor() throws Exception {
        super(new weka.classifiers.functions.SGD());
        var model = (weka.classifiers.functions.SGD) this.classifier;
        model.setOptions(new String[]{"-F","4"});
    }
    public StochasticForecastPredictor train(Map<String, SaleDetails> data) throws Exception {
        if(trained)
        {
            var model = (weka.classifiers.functions.SGD) this.classifier;
            for (var entry : data.entrySet())
                model.updateClassifier(transformer.transform(entry.getValue()));
        }
        else
        {
            super.train(data);
            trained=true;
        }
        return this;
    }

    public StochasticForecastPredictor train(SaleDetails data) throws Exception {
        var model = (weka.classifiers.functions.SGD) this.classifier;
        model.updateClassifier(transformer.transform(data));
        return this;
    }
}
