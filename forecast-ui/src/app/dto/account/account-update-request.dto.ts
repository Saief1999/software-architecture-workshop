import { GenderEnum } from "app/models/user.model";

export class AccountUpdateRequestDto {
  username = "";
  firstname = "";
  lastname = "";
  gender: GenderEnum = GenderEnum.undeclared;
  birthday = "";
  quote = "";
}
