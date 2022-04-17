package com.example.forecastbackend.entities;

import org.springframework.data.annotation.Id;

import java.util.Date;

/**
 * If the day is passed, this just show the total number of sales
 */
public class Forecast {

    @Id()
    private String id;

    private int nbSales;

    private Date date;

    private String productId;

    public int getNbSales() {
        return nbSales;
    }

    public Date getDate() {
        return date;
    }

    public String getId() {
        return id;
    }

    public String getProductId() {
        return productId;
    }

    public void setNbSales(int nbSales) {
        this.nbSales = nbSales;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }
}
