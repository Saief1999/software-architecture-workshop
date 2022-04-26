import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StoreListItem } from "app/dto/stores/store-list-item";
import { StoresService } from "app/services/stores.service";

@Component({
    selector: "app-stores",
    templateUrl: "./stores-page.component.html",
    styleUrls: ["stores-page.component.css"]
})
export class StoresPageComponent implements OnInit {
    
    // {
    //     _id: "1",
    //     name: "Store 1",
    //     description: "Store 1 description",
    //     },
    //     {
    //         _id: "2",
    //         name: "Store 2",
    //         description: "Store 2 description",
    //     }
    
    stores: StoreListItem[] = [];

    constructor(
        private router:Router,
        private storesService:StoresService
    ){}

    ngOnInit(): void {
        this.listStores();
    }


    listStores():void {
        this.storesService.listStores().subscribe(stores => {
            this.stores = stores;
        });
    }
}