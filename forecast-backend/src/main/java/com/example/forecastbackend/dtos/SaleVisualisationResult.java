package com.example.forecastbackend.dtos;

import com.example.forecastbackend.entities.Forecast;

import java.util.List;

public class SaleVisualisationResult {
    private List<Forecast> actualData;
    private List<Forecast> predicted;

    public SaleVisualisationResult(){}
    public SaleVisualisationResult(List<Forecast> actualData, List<Forecast> predicted) {
        this.actualData = actualData;
        this.predicted = predicted;
    }

    public List<Forecast> getActualData() {
        return actualData;
    }

    public void setActualData(List<Forecast> actualData) {
        this.actualData = actualData;
    }

    public List<Forecast> getPredicted() {
        return predicted;
    }

    public void setPredicted(List<Forecast> predicted) {
        this.predicted = predicted;
    }
}
