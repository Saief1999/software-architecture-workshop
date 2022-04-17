package com.example.forecastbackend.controllers;

import com.example.forecastbackend.entities.Product;
import com.example.forecastbackend.exceptions.BadRequestException;
import com.example.forecastbackend.respositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController()
@RequestMapping("products")
public class ProductController {

    private ProductRepository productRepository;
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    @GetMapping("")
    public List<Product> listProducts()
    {
        return productRepository.findAll();
    }

    @PostMapping("")
    public Product createProduct(@RequestBody Product product) {
        Product newProduct = productRepository.save(product);
       return newProduct;
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeProduct(@PathVariable("id") String id) {

        if(!productRepository.existsById(id))
            throw new BadRequestException(BadRequestException.ID_NOT_FOUND,"Product Not found with id " + id);

        productRepository.deleteById(id);

        Product deletedProduct =  new Product();
        deletedProduct.setId(id);

        return new ResponseEntity<String>("Product deleted", HttpStatus.OK);
    }


        @ExceptionHandler(BadRequestException.class)
    void handleBadRequests(BadRequestException bre, HttpServletResponse response) throws IOException {

        int respCode = (bre.errCode == BadRequestException.ID_NOT_FOUND) ?
                HttpStatus.NOT_FOUND.value() : HttpStatus.BAD_REQUEST.value() ;
        response.sendError(respCode, bre.errCode + ":" + bre.getMessage());
    }
}
