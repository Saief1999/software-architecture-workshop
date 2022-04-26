import { Component, OnInit } from "@angular/core";
import { Product } from "app/dto/products/product";
import { ProductsService } from "app/services/products.service";


@Component({
    selector: "app-products",
    templateUrl: "./products-page.component.html",
    styleUrls: ["./products-page.component.css"]
})
export class ProductsPageComponent implements OnInit {
    
    constructor(private productsService:ProductsService) { }

    // {
    //     _id: "1",
    //     name: "Product 1",
    //     price: 1,
    // },
    // {
    //     _id: "2",
    //     name: "Product 2",
    //     price: 2,
    // }
    products: Product[] = [];

    ngOnInit(): void {
        this.listProducts();
    }

    listProducts():void {
        this.productsService.listProducts().subscribe(products => {
            this.products = products;
        });
    }
}