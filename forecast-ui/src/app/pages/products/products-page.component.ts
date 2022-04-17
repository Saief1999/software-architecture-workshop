import { Component, OnInit } from "@angular/core";
import { Product } from "app/dto/products/product";


@Component({
    selector: "app-products",
    templateUrl: "./products-page.component.html",
    styleUrls: ["./products-page.component.css"]
})
export class ProductsPageComponent implements OnInit {
    constructor() { }
    products: Product[] = [{
        _id: "1",
        name: "Product 1",
        price: 1,
    },
    {
        _id: "2",
        name: "Product 2",
        price: 2,
    }

];

    ngOnInit(): void {
    }
}