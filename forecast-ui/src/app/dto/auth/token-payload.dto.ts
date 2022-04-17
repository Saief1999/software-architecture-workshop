export class TokenPayloadDto {
  _id: string;
  email: string;
  role: string;
  username: string;
  activated: boolean;
  constructor() {
    this._id = "";
    this.activated = false;
    this.email = "";
    this.role = "user";
    this.username = "";
  }
}
