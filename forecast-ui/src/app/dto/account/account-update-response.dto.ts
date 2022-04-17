import { User } from "app/models/user.model";

export class AccountUpdateResponseDto {
  token = "";
  user: User = new User();
}
