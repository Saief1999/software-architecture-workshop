import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from "app/dto/products/product";
import { StoreListItem } from "app/dto/stores/store-list-item";
import { ForecastService } from "app/services/forecast.service";
import { ProductsService } from "app/services/products.service";
import { StoresService } from "app/services/stores.service";
import { StoreElementComponent } from "../stores/store-element/store-element.component";


@Component({
    selector: "app-forecast",
    templateUrl: "./forecast-page.component.html",
    styleUrls: ["./forecast-page.component.css"]
})
export class ForecastPageComponent {

  products: Product[] = []
  product: Product;

  stores: StoreListItem[] = []
  store:StoreListItem;

  productSelectorSettings: any = {
    singleSelection: true,
    text: "Select Product",
    labelKey: "name",
  }

  storeSelectorSettings: any = {
    singleSelection: true,
    text: "Select Store",
    labelKey: "name"
  }

  forecastForm: FormGroup = new FormGroup({
    product: new FormControl("", [Validators.required]),
    store: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
  });

  constructor(
      private router:Router,
      private productsService:ProductsService,
      private storesService:StoresService,
      private forecastService:ForecastService
  ) {}

  ngOnInit(): void {
    this.listProducts();
    this.listStores();
  }

  listProducts():void {
    this.productsService.listProducts().subscribe(products => {
      this.products = products;
  });
  }

  listStores():void {
    this.storesService.listStores().subscribe(stores => {
        this.stores = stores;
    });
}

  submit() {
    console.log(this.forecastForm.value);
  }
  
  getForecast(productId:string, storeId:string, date:string) {
   this.forecastService.getForecast(productId, storeId, date).subscribe(forecast => {
      console.log(forecast);
    });
  }

  resetForm() {
    // this.setDefaultValues();
  }

  }