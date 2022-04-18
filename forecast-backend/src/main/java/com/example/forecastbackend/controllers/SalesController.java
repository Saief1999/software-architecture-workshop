package com.example.forecastbackend.controllers;

import com.example.forecastbackend.entities.Sale;
import com.example.forecastbackend.entities.Store;
import com.example.forecastbackend.exceptions.BadRequestException;
import com.example.forecastbackend.respositories.SalesRepository;
import com.example.forecastbackend.respositories.StoreRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController()
@RequestMapping("sales")
public class SalesController
{

    private final SalesRepository salesRepository;
    public SalesController(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }
    @GetMapping("")
    public List<Sale> listSales()
    {
        return salesRepository.findAll();
    }
    @PostMapping("")
    public Sale createStore(@RequestBody Sale sale) {
        Sale newSale = salesRepository.save(sale);
        return newSale;
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeStore(@PathVariable("id") String id) {

        if(!salesRepository.existsById(id))
            throw new BadRequestException(BadRequestException.ID_NOT_FOUND,"Sale Not found with id " + id);

        salesRepository.deleteById(id);

        //Sale deletedSale =  new Sale();
        //deletedSale.setId(id);

        return new ResponseEntity<String>("Sale deleted", HttpStatus.OK);
    }

    @ExceptionHandler(BadRequestException.class)
    void handleBadRequests(BadRequestException bre, HttpServletResponse response) throws IOException {

        int respCode = (bre.errCode == BadRequestException.ID_NOT_FOUND) ?
                HttpStatus.NOT_FOUND.value() : HttpStatus.BAD_REQUEST.value() ;
        response.sendError(respCode, bre.errCode + ":" + bre.getMessage());
    }
}
