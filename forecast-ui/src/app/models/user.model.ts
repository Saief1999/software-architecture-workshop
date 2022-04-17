export enum UserRoleEnum {
  admin = "admin",
  user = "user"
}
export enum GenderEnum {
  undeclared = "Rather not say",
  male = "Male",
  female = "Female"
}

export class User {
  _id?: string;
  username = "";
  firstname = "";
  lastname = "";
  password = "";
  email = "";
  role?: UserRoleEnum = UserRoleEnum.user;
  profileImage = "";
  activated = false;
  gender?: GenderEnum = GenderEnum.undeclared;
  quote = "";
  birthday = "";

  constructor(id = "", firstname = "", lastname = "", email = "", quote = "") {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.quote = quote;
  }
}
