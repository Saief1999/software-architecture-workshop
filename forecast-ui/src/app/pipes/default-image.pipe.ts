import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "defaultIfNone" })
export class defaultImagePipe implements PipeTransform {
  transform(value: string): string {
    if (value !== null) return value;
    return "assets/img/movies/default-image.svg";
  }
}
