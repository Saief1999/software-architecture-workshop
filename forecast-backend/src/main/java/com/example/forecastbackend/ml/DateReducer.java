package com.example.forecastbackend.ml;

import com.example.forecastbackend.dtos.SaleDetails;

import java.util.HashMap;
import java.util.Map;

public class DateReducer
{
    /**
     * Reduces the sales per month
     *
     * <p>
     * Sum the quantity of sales per month for each product in our initial sale map, so instead of having many sales for the same
     * product, we will only have one, containing the total quantity, for each month
     * </p>
     *
     * @param map
     * @return
     */
    public Map<String, SaleDetails> reduce(Map<String,SaleDetails> map)
    {
        Map<Quadruplet<String,String,Integer,Integer>,String> saleMapper = new HashMap<>();
        Map<String,SaleDetails> reducedMap = new HashMap<>();
        for(Map.Entry<String,SaleDetails> entry : map.entrySet())
        {
            var id=entry.getKey();
            var saleDetails=entry.getValue();
            var date=saleDetails.getDate();
            var month=date.getMonth();
            var year=date.getYear();
            var productId=saleDetails.getProductId();
            var storeId=saleDetails.getStoreId();
            var quadruplet=new Quadruplet<>(storeId,productId,month,year);
            if(saleMapper.containsKey(quadruplet))
            {
                var existingId=saleMapper.get(quadruplet);
                reducedMap.get(existingId).setQuantity(reducedMap.get(existingId).getQuantity()+saleDetails.getQuantity());
            }
            else {
                saleMapper.put(quadruplet,id);
                reducedMap.put(id,saleDetails);
            }
        }
        return reducedMap;
    }

}
