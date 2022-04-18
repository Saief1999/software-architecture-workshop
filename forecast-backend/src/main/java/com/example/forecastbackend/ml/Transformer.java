package com.example.forecastbackend.ml;

import com.example.forecastbackend.dtos.SaleDetails;
import org.jetbrains.annotations.NotNull;
import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

public class Transformer
{
    private ArrayList<Attribute> attributes;
    private Map<String,Integer> storeEncoder = new HashMap<>(),productEncoder = new HashMap<>();
    private int classIndex=3;
    public Transformer()
    {
        attributes=new ArrayList<>();
        attributes.add(new Attribute("store_id"));
        attributes.add(new Attribute("product_id"));
        attributes.add(new Attribute("price"));
        attributes.add(new Attribute("quantity"));
        attributes.add(new Attribute("year"));
        attributes.add(new Attribute("month"));
    }
    private final Vector<String> storeInverseEncoder = new Vector<>();
    private final Vector<String> productInverseEncoder = new Vector<>();
    public Instances transform(Map<String, SaleDetails> mapper)
    {
        Instances dataset=new Instances("sales",attributes,1000);
        for (var id : mapper.keySet())
        {
            Instance instance=new DenseInstance(attributes.size());
            if(!storeEncoder.containsKey(mapper.get(id).getStoreId()))
            {
                storeEncoder.put(mapper.get(id).getStoreId(),storeEncoder.size());
                storeInverseEncoder.add(mapper.get(id).getStoreId());
            }
            if(!productEncoder.containsKey(mapper.get(id).getProductId()))
            {
                productEncoder.put(mapper.get(id).getProductId(),productEncoder.size());
                productInverseEncoder.add(mapper.get(id).getProductId());
            }
            instance.setValue(0,storeEncoder.get(mapper.get(id).getStoreId()));
            instance.setValue(1,productEncoder.get(mapper.get(id).getProductId()));
            instance.setValue(2,mapper.get(id).getPrice());
            instance.setValue(3,mapper.get(id).getQuantity());
            instance.setValue(4,mapper.get(id).getDate().getYear());
            instance.setValue(5,mapper.get(id).getDate().getMonth());
            dataset.add(instance);
        }
        dataset.setClassIndex(classIndex);
        return dataset;
    }

    public Instance transform(@NotNull SaleDetails saleDetails)
    {
        Instance instance=new DenseInstance(attributes.size());
        if(!storeEncoder.containsKey(saleDetails.getStoreId()))
        {
            storeEncoder.put(saleDetails.getStoreId(),storeEncoder.size());
            storeInverseEncoder.add(saleDetails.getStoreId());
        }
        if(!productEncoder.containsKey(saleDetails.getProductId()))
        {
            productEncoder.put(saleDetails.getProductId(),productEncoder.size());
            productInverseEncoder.add(saleDetails.getProductId());
        }
        instance.setValue(0,storeEncoder.get(saleDetails.getStoreId()));
        instance.setValue(1,productEncoder.get(saleDetails.getProductId()));
        instance.setValue(2,saleDetails.getPrice());
        instance.setValue(3,saleDetails.getQuantity());
        instance.setValue(4,saleDetails.getDate().getYear());
        instance.setValue(5,saleDetails.getDate().getMonth());
        return instance;
    }

    public SaleDetails inverseTransform(Instance instance)
    {
        SaleDetails saleDetails=new SaleDetails();
        saleDetails.setStoreId(storeInverseEncoder.get((int)instance.value(0)));
        saleDetails.setProductId(productInverseEncoder.get((int)instance.value(1)));
        saleDetails.setPrice(instance.value(2));
        saleDetails.setQuantity((int)instance.value(3));
        LocalDate localDate=LocalDate.of((int)instance.value(4),(int)instance.value(5),1);
        Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        saleDetails.setDate(date);
        return saleDetails;
    }

    public Map<String,SaleDetails> inverseTransform(Instances dataset)
    {
        Map<String,SaleDetails> mapper=new HashMap<>();
        for (int i = 0; i < dataset.numInstances(); i++)
        {
            SaleDetails saleDetails=new SaleDetails();
            saleDetails.setStoreId(storeInverseEncoder.get((int)dataset.instance(i).value(0)));
            saleDetails.setProductId(productInverseEncoder.get((int)dataset.instance(i).value(1)));
            saleDetails.setPrice(dataset.instance(i).value(2));
            saleDetails.setQuantity((int)dataset.instance(i).value(3));
            LocalDate localDate=LocalDate.of((int)dataset.instance(i).value(4),(int)dataset.instance(i).value(5),1);
            Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
            saleDetails.setDate(date);
            mapper.put(saleDetails.getStoreId()+"-"+saleDetails.getProductId(),saleDetails);
        }
        return mapper;
    }

    public Vector<String> getStoreInverseEncoder()
    {
        return storeInverseEncoder;
    }

    public Vector<String> getProductInverseEncoder()
    {
        return productInverseEncoder;
    }

    public List<Attribute> getAttributes()
    {
        return attributes;
    }

    public int getClassIndex() {
        return classIndex;
    }
}
