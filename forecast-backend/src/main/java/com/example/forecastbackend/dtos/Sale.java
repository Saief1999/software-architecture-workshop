package com.example.forecastbackend.dtos;

import java.util.Date;

public class Sale {
    private String productId;
    private String storeId;
    private int quantity;
    private Date date;


    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getProductId() {
        return productId;
    }

    public Date getDate() {
        return date;
    }

    public String getStoreId() {
        return storeId;
    }
}
