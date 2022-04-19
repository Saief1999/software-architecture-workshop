package com.example.forecastbackend.controllers;

import com.example.forecastbackend.entities.Store;
import com.example.forecastbackend.exceptions.BadRequestException;
import com.example.forecastbackend.respositories.StoreRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController()
@RequestMapping("stores")
public class StoreController {

    private StoreRepository storeRepository;
    public StoreController(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }
    @GetMapping("")
    public List<Store> listStores()
    {
        return storeRepository.findAll();
    }
    @PostMapping("")
    public Store createStore(@RequestBody Store store) {
        Store newStore = storeRepository.save(store);
        return newStore;
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeStore(@PathVariable("id") String id) {

        if(!storeRepository.existsById(id))
            throw new BadRequestException(BadRequestException.ID_NOT_FOUND,"Store Not found with id " + id);

        storeRepository.deleteById(id);

        //Store deletedStore =  new Store();
        //deletedStore.setId(id);

        return new ResponseEntity<String>("Store deleted", HttpStatus.OK);
    }

    @ExceptionHandler(BadRequestException.class)
    void handleBadRequests(BadRequestException bre, HttpServletResponse response) throws IOException {

        int respCode = (bre.errCode == BadRequestException.ID_NOT_FOUND) ?
                HttpStatus.NOT_FOUND.value() : HttpStatus.BAD_REQUEST.value() ;
        response.sendError(respCode, bre.errCode + ":" + bre.getMessage());
    }
}
