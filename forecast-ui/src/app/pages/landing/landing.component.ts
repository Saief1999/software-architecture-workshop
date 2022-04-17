import { Component, DoCheck, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "app/models/user.model";
import { AuthenticationService } from "app/services/authentication.service";
import { LandingPageService } from "app/services/landing.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit, DoCheck {
  focus: any;
  focus1: any;
  authenticated = true;
  admins: User[] = [];
  successMessage = "";
  errorMessage = "";

  sendEmailForm: FormGroup = new FormGroup({
    destination: new FormControl("", [Validators.required, Validators.email]),
    message: new FormControl("", [Validators.required])
  });

  // constructor(
  //   private readonly authService: AuthenticationService,
  //   private readonly landingService: LandingPageService
  // ) {}

  ngOnInit() {
    // this.landingService.getListAdmins().subscribe({
    //   next: (response) => {
    //     this.admins = response;
    //   }
    // });
  }

  ngDoCheck(): void {
    // this.authenticated = this.authService.isAuthenticated();
  }

  // submitEmail() {
  //   const payload = this.sendEmailForm.value;
  //   this.landingService.sendEmailToContacts(payload).subscribe({
  //     next: (data) => {
  //       this.successMessage = data.message;
  //     },
  //     error: (err) => {
  //       this.errorMessage = err;
  //     }
  //   });
  // }

  removeMessage() {
    this.errorMessage = "";
    this.successMessage = "";
  }
}
