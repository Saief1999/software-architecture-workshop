package com.example.forecastbackend.dtos;

import com.example.forecastbackend.entities.Sale;

public class SaleDetails extends Sale {
    private double price;


    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
