import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginResponseDto } from "app/dto/auth/login-response-dto";
import { LoginDto } from "app/dto/auth/logindto";
import { RegistrationDto } from "app/dto/auth/registration-dto";
import { RegistrationResponseDto } from "app/dto/auth/registration-response-dto";
import {
  LOGINLINK,
  REGISTRATIONLINK,
  EMAILCONFIRMATIONLINK,
  RESENDCONFIRMATIONLINK,
  ACCOUNTPROFILELINK
} from "../../constants";
import { Observable } from "rxjs";
import { User } from "app/models/user.model";
import { TokenPayloadDto } from "app/dto/auth/token-payload.dto";
import { VerifyEmailResponseDto } from "app/dto/auth/verify-email-response.dto";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(LOGINLINK, credentials);
  }

  signup(
    accountInformations: RegistrationDto
  ): Observable<RegistrationResponseDto> {
    return this.http.post<RegistrationResponseDto>(
      REGISTRATIONLINK,
      accountInformations
    );
  }

  confirmEmail(token: String): Observable<VerifyEmailResponseDto> {
    return this.http.post<VerifyEmailResponseDto>(`${EMAILCONFIRMATIONLINK}`, {
      token: token
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  resendConfirmation(): Observable<any> {
    return this.http.get<any>(`${RESENDCONFIRMATIONLINK}`);
  }

  getTokenPayload(): TokenPayloadDto {
    if (this.isAuthenticated()) {
      const token: string = localStorage.getItem("token");
      return JSON.parse(atob(token.split(".")[1])) as TokenPayloadDto;
    }
    return null;
  }

  hasRole(role: string): boolean {
    const tokenPayload: TokenPayloadDto = this.getTokenPayload();

    if (tokenPayload === null) {
      return false;
    }

    if (tokenPayload.role === role) {
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem("token");
  }
}
