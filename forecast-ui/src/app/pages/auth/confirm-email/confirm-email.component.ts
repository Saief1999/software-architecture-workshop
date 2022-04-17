import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: "app-confirm-email",
  templateUrl: "./confirm-email.component.html",
  styleUrls: ["./confirm-email.component.css"]
})
export class ConfirmEmailComponent implements OnInit {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        const token: string = params["token"];
        this.authService.confirmEmail(token).subscribe({
          next: (data) => {
            const { token } = data;
            localStorage.setItem("token", token);
            this.router.navigate(["/account"]);
          },
          error: (err) => {}
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  resendConfirmation() {
    this.authService.resendConfirmation().subscribe({
      next: (data) => {},
      error: (error) => console.error(error)
    });
  }
}
