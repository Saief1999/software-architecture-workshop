import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { ComponentsComponent } from "./components/components.component";
import { ProfileComponent } from "./examples/profile/profile.component";
import { SignupComponent } from "./examples/signup/signup.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { NucleoiconsComponent } from "./components/nucleoicons/nucleoicons.component";
import { RegistrationPageComponent } from "./pages/auth/registration-page.component";
import { LoginCardComponent } from "./pages/auth/login-card/login-card.component";
import { SignupCardComponent } from "./pages/auth/signup-card/signup-card.component";
import { NotFoundPageComponent } from "./not-found/not-found-page.component";
import { ConfirmEmailComponent } from "./pages/auth/confirm-email/confirm-email.component";
import { AccountPageComponent } from "./pages/account/account-page.component";
import { UserRoleGuard } from "./guards/user-role.guard";
import { UnauthenticatedGuard } from "./guards/unauthenticated.guard";
// import { AuthenticatedGuad } from './guards/authenticated.guard';
import { AuthenticatedGuad } from "./guards/authenticated.guard";
import { StoresPageComponent } from "./pages/stores/stores-page.component";
import { ProductsPageComponent } from "./pages/products/products-page.component";
import { ForecastPageComponent } from "./pages/forecast/forecast-page.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: LandingComponent },
  // { path: "user-profile", component: ProfileComponent },
  { path: "signup", component: SignupComponent },
  { path: "landing", component: ComponentsComponent },
  // { path: "nucleoicons", component: NucleoiconsComponent },
  {
    path: "register",
    component: RegistrationPageComponent,
    children: [
      {
        path: "",
        redirectTo: "/register/login",
        pathMatch: "full",
        canActivate: [UnauthenticatedGuard]
      },
      {
        path: "login",
        component: LoginCardComponent,
        canActivate: [UnauthenticatedGuard]
      },
      {
        path: "signup",
        component: SignupCardComponent,
        canActivate: [UnauthenticatedGuard]
      }
    ],
    canActivate: [UnauthenticatedGuard]
  },
  { path: "stores", component: StoresPageComponent },
  { path: "products", component: ProductsPageComponent },
  { path: "forecast", component: ForecastPageComponent },
  { path: "**", redirectTo: "not-found" },
  { path: "not-found", component: NotFoundPageComponent }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
