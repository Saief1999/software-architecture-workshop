import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { StoreListItem } from "app/dto/stores/store-list-item";

@Component({
  selector: "app-store-element",
  templateUrl: "./store-element.component.html",
  styleUrls: ["./store-element.component.css"]
})
export class StoreElementComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}

  @Input() store: StoreListItem;
  ngOnInit(): void {}
}
