import { Component, OnInit } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { RegistrationDto } from "app/dto/auth/registration-dto";
import { RegistrationResponseDto } from "app/dto/auth/registration-response-dto";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: "app-signup-card",
  templateUrl: "./signup-card.component.html",
  styleUrls: ["./signup-card.component.css"]
})
export class SignupCardComponent {
  private registrationDto: RegistrationDto = null;
  errorMessage: String = "";
  checked = false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  removeMessage() {
    this.errorMessage = "";
  }

  setChecked() {
    this.checked = !this.checked;
  }

  register(registrationForm: NgForm): void {
    this.registrationDto = registrationForm.value;
    console.log(this.registrationDto);
    this.authenticationService.signup(this.registrationDto).subscribe({
      next: (data: RegistrationResponseDto) => {
        localStorage.setItem("token", data.token);
        this.router.navigate(["account"]);
      },
      error: (error) => {
        this.errorMessage = error.split(": ")[2];
      }
    });
  }
}
