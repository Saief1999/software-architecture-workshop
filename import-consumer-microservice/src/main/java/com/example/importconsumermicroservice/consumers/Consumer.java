package com.example.importconsumermicroservice.consumers;

import com.example.importconsumermicroservice.pojos.Message;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class Consumer
{
    @KafkaListener(topics = "${kafka.topic}", groupId = "${kafka.group-id}")
    public void receiveUpdate(Message message) throws IOException {


        System.out.println("Received a message : "+ message.getUrl());
    }
}