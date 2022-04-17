import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EmailChangeRequestDto } from "app/dto/account/email-change-request.dto";
import { VerificationCodeRequestDto } from "app/dto/account/verification-code-request.dto";
import { TokenPayloadDto } from "app/dto/auth/token-payload.dto";
import { User } from "app/models/user.model";
import { AccountService } from "app/services/account.service";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: "app-email-section",
  templateUrl: "./email-section.component.html",
  styleUrls: ["./email-section.component.css"]
})
export class EmailSectionComponent implements OnInit, DoCheck, OnChanges {
  newEmailForm = new FormGroup({
    newEmail: new FormControl("", [Validators.required, Validators.email])
  });
  emailVerificationCodeForm = new FormGroup({
    verificationCode: new FormControl("", [
      Validators.required,
      Validators.min(10000),
      Validators.max(99999)
    ])
  });
  emailFormVisibility: boolean = false;
  accountActivated: boolean = false;
  emailConfirmationCodeVisibility: boolean = false;
  emailInformationConfirmationStatus: boolean = false;
  emailInformationDisabled: boolean = true;
  errorMessage: string = "";
  successMessage: string = "";
  @Input() user: User = new User();
  @Output() emailChangeEvent: EventEmitter<User> = new EventEmitter();
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.emailInformationDisabled = !(
      this.newEmailForm.valid &&
      this.newEmailForm.touched &&
      this.emailInformationConfirmationStatus
    );
  }

  ngOnChanges(): void {
    const tokenPayload: TokenPayloadDto = this.authService.getTokenPayload();
    this.accountActivated = tokenPayload.activated;
  }

  removeMessage() {
    this.errorMessage = "";
    this.successMessage = "";
  }
  setEmailFormVisibility() {
    this.emailFormVisibility = !this.emailFormVisibility;
  }
  clickEmailConfirmation() {
    this.emailInformationConfirmationStatus =
      !this.emailInformationConfirmationStatus;
  }

  submitNewEmail() {
    const payload: EmailChangeRequestDto = this.newEmailForm
      .value as EmailChangeRequestDto;
    this.accountService.updateEmail(payload).subscribe({
      next: (data) => {
        this.emailConfirmationCodeVisibility = true;
        this.successMessage = data.message;
      },
      error: (err) => {
        this.errorMessage = err.split(": ")[2];
      }
    });
  }
  submitEmailVerification() {
    const payload: VerificationCodeRequestDto = this.emailVerificationCodeForm
      .value as VerificationCodeRequestDto;
    this.accountService.confirmUpdatingEmail(payload).subscribe({
      next: (data) => {
        const { token, user } = data;
        localStorage.setItem("token", token);
        this.emailChangeEvent.emit(user);
        this.emailVerificationCodeForm.reset();
        this.emailVerificationCodeForm.markAsUntouched();
        this.newEmailForm.reset();
        this.newEmailForm.markAsPristine();
        this.emailFormVisibility = false;
        this.emailConfirmationCodeVisibility = false;
        this.emailInformationConfirmationStatus = false;
        this.successMessage = "Email changed Successfully";
      },
      error: (err) => {
        this.errorMessage = err.split(": ")[2];
      }
    });
  }

  resendEmailVerification() {
    this.authService.resendConfirmation().subscribe({
      next: (data) => {
        this.successMessage = data.message;
      },
      error: (err) => {
        this.errorMessage = err.split(": ")[2];
      }
    });
  }
}
