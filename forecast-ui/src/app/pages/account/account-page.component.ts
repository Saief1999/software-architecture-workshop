import { Component, OnInit } from "@angular/core";
import { User } from "app/models/user.model";
import { AccountService } from "app/services/account.service";

@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.css"]
})
export class AccountPageComponent implements OnInit {
  constructor(private readonly accountService: AccountService) {}
  user: User = new User();
  ngOnInit(): void {
    this.accountService.getAuthenticatedAccount().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => console.error(err)
    });
  }

  changeUser(user: User) {
    this.user = user;
  }
}
