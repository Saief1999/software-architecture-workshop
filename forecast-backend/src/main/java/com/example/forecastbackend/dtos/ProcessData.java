package com.example.forecastbackend.dtos;

import com.example.forecastbackend.entities.Product;
import com.example.forecastbackend.entities.Store;

import java.util.List;

public class ProcessData {

    private List<Sale> sales;
    private List<Store> stores;
    private List<Product> products;


    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public void setSales(List<Sale> sales) {
        this.sales = sales;
    }

    public void setStores(List<Store> stores) {
        this.stores = stores;
    }

    public List<Product> getProducts() {
        return products;
    }

    public List<Sale> getSales() {
        return sales;
    }

    public List<Store> getStores() {
        return stores;
    }
}
