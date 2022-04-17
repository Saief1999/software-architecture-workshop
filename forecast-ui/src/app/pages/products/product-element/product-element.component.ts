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
  // movieImage(): string {
  //   if (!this.movie.poster_path) return null;
  //   return TMDB_IMG_URI + this.movie.poster_path;
  // }


  // genreName(id: number) {
  //   const name: String =
  //     genres.value.find((genre) => genre.id === id)?.name || "";
  //   if (name === "Science Fiction") return "Sci-Fi";
  //   return name;
  // }
}
