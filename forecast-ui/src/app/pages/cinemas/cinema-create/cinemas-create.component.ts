import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CinemaListItem } from "app/dto/cinemas/cinema-list-item";
import { CinemasService } from "app/services/cinemas.service";
import { Cinema } from "../../../dto/cinemas/cinema";
import { CinemaImage } from "../../../dto/cinemas/cinema-image";
import { Route } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { parseClassNames } from "@fullcalendar/core";

@Component({
  selector: "app-cinemas-create",
  templateUrl: "./cinemas-create-minimal.component.html",
  styleUrls: ["./cinemas-create.component.css"]
})
export class CinemasCreateComponent implements OnInit {
  imgURL: string = "assets/img/cinema.jpg";
  termsNotAgree: boolean = false;
  imgFile: File = new File([], "");
  errorMessage = "";
  successMessage = "";

  cinema: Cinema = new Cinema();
  create: boolean = true;
  cinemaId: string = "";
  cinemaForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("\\b\\d{8}\\b")
    ]),
    openingTime: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(([01][0-9])|(2[0-3])):[0-5][0-9]$/)
    ]),
    closingTime: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(([01][0-9])|(2[0-3])):[0-5][0-9]$/)
    ]),
    description: new FormControl("")
  });
  constructor(
    protected router: Router,
    protected cinemaService: CinemasService,
    protected readonly activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // check for id in the rout and if it exsists aabi el form
    // this.activedRoute.params
    if (!(this.router.url === "/cinemas/create")) {
      this.activedRoute.params.subscribe({
        next: (params) => {
          this.cinemaId = params.id;
          this.create = false;
        },
        error: (err) => this.router.navigate(["not-found"])
      });
      this.cinemaService.getCinema(this.cinemaId).subscribe({
        next: (data) => {
          this.cinema = data;
          this.setDefaultValues();
        },
        error: (err) => {
          this.errorMessage = err.split(": ")[2];
        }
      });
    }
  }

  setDefaultValues() {
    const {
      name,
      description,
      openingTime,
      closingTime,
      phone,
      address,
      imageUrl
    } = this.cinema;
    this.cinemaForm.get("name").setValue(name);
    this.cinemaForm.get("description").setValue(description);
    this.cinemaForm.get("openingTime").setValue(openingTime);
    this.cinemaForm.get("closingTime").setValue(closingTime);
    this.cinemaForm.get("phone").setValue(phone);
    this.cinemaForm.get("address").setValue(address);
    this.imgURL = imageUrl;
  }

  onFileInput(event): void {
    if (event.target.files[0]) {
      this.imgFile = event.target.files[0];
      const imgURLObserver = this.cinemaService.uploadFile(
        event.target.files[0]
      );
      imgURLObserver.subscribe((cinemaImage: CinemaImage) => {
        this.cinema.imageUrl = cinemaImage.imageUrl;
        this.imgURL = cinemaImage.imageUrl;
      });
    }
  }

  submit() {
    this.cinema = this.cinemaForm.value;
    this.cinema._id = this.cinemaId;
    this.cinema.imageUrl = this.imgURL;
    if (this.create) {
      this.cinemaService.createCinema(this.cinema).subscribe({
        next: (data) => {
          this.router.navigate(["cinemas"]);
        },
        error: (err) => {
          this.errorMessage = err.split(": ")[2];
        }
      });
    } else {
      this.cinemaService.updateCinema(this.cinema).subscribe({
        next: (data) => {
          this.successMessage = "Cinema Updated Successfull";
          this.cinema = data;
          this.setDefaultValues();
        },
        error: (err) => {
          this.errorMessage = err.split(": ")[2];
        }
      });
    }
    console.log(this.cinema);
  }

  setTermsAgreed() {
    this.termsNotAgree = !this.termsNotAgree;
    console.log(this.termsNotAgree);
  }

  removeMessage() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  resetForm() {
    this.setDefaultValues();
  }
}
