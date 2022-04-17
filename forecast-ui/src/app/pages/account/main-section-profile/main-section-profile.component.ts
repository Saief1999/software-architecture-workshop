import { Component, DoCheck, Input, OnChanges, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountUpdateRequestDto } from "app/dto/account/account-update-request.dto";
import { GenderEnum, User } from "app/models/user.model";
import { AccountService } from "app/services/account.service";
import { EventEmitter } from "@angular/core";
import { PasswordUpdateRequestDto } from "app/dto/account/password-update-request.dto";
import { VerificationCodeRequestDto } from "app/dto/account/verification-code-request.dto";
import { EmailChangeRequestDto } from "app/dto/account/email-change-request.dto";

@Component({
  selector: "app-main-section-profile",
  templateUrl: "./main-section-profile.component.html",
  styleUrls: ["./main-section-profile.component.css"]
})
export class MainSectionProfileComponent {
  constructor() {}
  @Input() user: User = new User();

  @Output() submitGeneralInfoEvent: EventEmitter<User> = new EventEmitter();

  listenToInformationChanges(data: User) {
    this.submitGeneralInfoEvent.emit(data);
  }
}
