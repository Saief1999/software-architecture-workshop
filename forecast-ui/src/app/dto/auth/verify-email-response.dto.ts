export class VerifyEmailResponseDto {
  message: string;
  token: string;

  constructor() {
    this.message = "";
    this.token = "";
  }
}
