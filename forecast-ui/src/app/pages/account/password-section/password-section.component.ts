import { Component, DoCheck, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PasswordUpdateRequestDto } from "app/dto/account/password-update-request.dto";
import { VerificationCodeRequestDto } from "app/dto/account/verification-code-request.dto";
import { AccountService } from "app/services/account.service";

@Component({
  selector: "app-password-section",
  templateUrl: "./password-section.component.html",
  styleUrls: ["./password-section.component.css"]
})
export class PasswordSectionComponent implements OnInit, DoCheck {
  passwordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    newPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ])
  });
  verificationCodeForm = new FormGroup({
    verificationCode: new FormControl("", [
      Validators.required,
      Validators.min(10000),
      Validators.max(99999)
    ])
  });

  errorMessage: string = "";
  successMessage: string = "";

  passwordsMatching: boolean = true;

  passwordInformationConfirmationStatus: boolean = false;

  passwordInformationDisabled: boolean = true;

  passwordConfirmationCodeVisibility: boolean = false;

  constructor(private readonly accountService: AccountService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.passwordsMatching =
      this.passwordForm.get("newPassword").value ===
      this.passwordForm.get("confirmPassword").value;
    this.passwordInformationDisabled = !(
      this.passwordForm.valid &&
      this.passwordForm.touched &&
      this.passwordsMatching &&
      this.passwordInformationConfirmationStatus
    );
  }

  removeMessage() {
    this.errorMessage = "";
    this.successMessage = "";
  }
  getPasswordInput() {
    return this.passwordForm.get("currentPassword");
  }
  getNewPasswordInput() {
    return this.passwordForm.get("newPassword");
  }
  getConfirmationPasswordInput() {
    return this.passwordForm.get("confirmPassword");
  }

  clickPasswordConfirmation() {
    this.passwordInformationConfirmationStatus =
      !this.passwordInformationConfirmationStatus;
  }

  submitPasswordChanges() {
    const payload: PasswordUpdateRequestDto = this.passwordForm
      .value as PasswordUpdateRequestDto;
    this.accountService.updateCurrentAccountPassword(payload).subscribe({
      next: (data) => {
        this.passwordConfirmationCodeVisibility = true;
        this.successMessage = data.message;
      },
      error: (err) => {
        this.errorMessage = err.split(": ")[2];
      }
    });
  }
  submitVerification() {
    const payload: VerificationCodeRequestDto = this.verificationCodeForm
      .value as VerificationCodeRequestDto;
    this.accountService.confirmUpdatingPassword(payload).subscribe({
      next: (data) => {
        this.passwordForm.reset();
        this.verificationCodeForm.reset();
        this.passwordConfirmationCodeVisibility = false;
        this.passwordInformationConfirmationStatus = false;
        this.successMessage = data.message;
      },
      error: (err) => {
        this.errorMessage = err.split(": ")[2];
      }
    });
  }
}
