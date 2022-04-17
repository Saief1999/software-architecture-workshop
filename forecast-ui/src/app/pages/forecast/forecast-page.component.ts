import { Component } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    selector: "app-forecast",
    templateUrl: "./forecast-page.component.html",
    styleUrls: ["./forecast-page.component.css"]
})
export class ForecastPageComponent {

    constructor(
        private router:Router
    ) {}

    ngOnInit(): void {
    }
}