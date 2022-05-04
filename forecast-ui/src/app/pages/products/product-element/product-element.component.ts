import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "app/dto/products/product";

@Component({
  selector: "app-product-element",
  templateUrl: "./product-element.component.html",
  styleUrls: ["./product-element.component.css"]
})
export class ProductElementComponent implements OnInit {

  constructor(private router: Router) {}

  @Input() product: Product;

  ngOnInit(): void {}

}
