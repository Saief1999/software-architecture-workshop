import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-cinemas",
  templateUrl: "./not-found-page.component.html",
  styleUrls: ["./not-found-page.component.css"]
})
export class NotFoundPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}