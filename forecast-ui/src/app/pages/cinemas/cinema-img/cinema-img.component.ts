import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CinemaListItem } from "app/dto/cinemas/cinema-list-item";

@Component({
  selector: "app-cinema-img",
  templateUrl: "./cinema-img.component.html",
  styleUrls: ["./cinema-img.component.css"]
})
export class CinemaImgComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() cinema: CinemaListItem;
  ngOnInit(): void {}
}
