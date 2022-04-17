import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountUpdateRequestDto } from "app/dto/account/account-update-request.dto";
import { GenderEnum, User } from "app/models/user.model";
import { AccountService } from "app/services/account.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-general-information-section",
  templateUrl: "./general-information-section.component.html",
  styleUrls: ["./general-information-section.component.css"]
})
export class GeneralInformationSectionComponent
  implements OnInit, DoCheck, OnChanges
{
  generalInformationForm: FormGroup = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[A-Za-z0-9-.]+")
    ]),
    firstname: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    lastname: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    gender: new FormControl(""),
    birthday: new FormControl(""),
    quote: new FormControl("")
  });
  generalInformationconfirmationStatus: boolean = false;
  generalInformationDisabled: boolean = true;
  genders: GenderEnum[] = [
    GenderEnum.male,
    GenderEnum.female,
    GenderEnum.undeclared
  ];
  errorMessage: string = "";
  successMessage: string = "";
  @Input() user: User = new User();
  @Output() submitGeneralInfoEvent: EventEmitter<User> = new EventEmitter();

  constructor(private readonly accountService: AccountService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.populateForm();
  }

  populateForm() {
    const { username, firstname, lastname, gender, birthday, quote } =
      this.user;
    this.generalInformationForm.get("username").setValue(username);
    this.generalInformationForm.get("firstname").setValue(firstname);
    this.generalInformationForm.get("lastname").setValue(lastname);
    this.generalInformationForm.get("gender").setValue(gender);
    this.generalInformationForm.get("birthday").setValue(birthday);
    this.generalInformationForm.get("quote").setValue(quote);
  }

  removeMessage() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  ngDoCheck(): void {
    this.generalInformationDisabled = !(
      this.generalInformationconfirmationStatus &&
      this.generalInformationForm.valid &&
      this.generalInformationForm.dirty
    );
  }

  getUsernameInput() {
    return this.generalInformationForm.get("username");
  }

  getFirstnameInput() {
    return this.generalInformationForm.get("firstname");
  }

  getLastnameInput() {
    return this.generalInformationForm.get("lastname");
  }

  clickConfirmation() {
    this.generalInformationconfirmationStatus =
      !this.generalInformationconfirmationStatus;
  }

  submitGeneralChanges() {
    const payload: AccountUpdateRequestDto = this.generalInformationForm
      .value as AccountUpdateRequestDto;
    this.accountService.updateCurrentAccountGeneralInfo(payload).subscribe({
      next: (data) => {
        const { user, token } = data;
        localStorage.setItem("token", token);
        this.submitGeneralInfoEvent.emit(user);
        this.generalInformationForm.markAsPristine();
        this.generalInformationconfirmationStatus = false;
        this.successMessage = "Profile updated successfully";
      },
      error: (err) => {
        this.populateForm();
        this.errorMessage = err.split(": ")[2];
      }
    });
  }
}
