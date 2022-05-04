import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";

import { AuthentificationInterceptorProvider } from "./interceptors/auth.interceptor";
import { ComponentsModule } from "./components/components.module";
import { ExamplesModule } from "./examples/examples.module";
import { RegistrationPageComponent } from "./pages/auth/registration-page.component";
import { LoginCardComponent } from "./pages/auth/login-card/login-card.component";
import { SignupCardComponent } from "./pages/auth/signup-card/signup-card.component";
import { ErrorMessageComponent } from "./pages/auth/error-message/error-message.component";
import { HttpClientModule } from "@angular/common/http";
import { ConfirmEmailComponent } from "./pages/auth/confirm-email/confirm-email.component";
import { AccountPageComponent } from "./pages/account/account-page.component";
import { TopSectionComponent } from "./pages/account/top-section/top-section.component";
import { MainSectionProfileComponent } from "./pages/account/main-section-profile/main-section-profile.component";
import { Ng2PageScrollModule } from "ng2-page-scroll";
import { GeneralInformationSectionComponent } from "./pages/account/general-information-section/general-information-section.component";
import { EmailSectionComponent } from "./pages/account/email-section/email-section.component";
import { PasswordSectionComponent } from "./pages/account/password-section/password-section.component";
import { HttpErrorInterceptorProvider } from "./interceptors/http-error.interceptor";

import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { defaultImagePipe } from "./pipes/default-image.pipe";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FullCalendarModule } from "@fullcalendar/angular";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import BootstrapThemePlugin from "@fullcalendar/bootstrap";
import { LandingComponent } from "./pages/landing/landing.component";

import { StoresPageComponent } from "./pages/stores/stores-page.component";
import { StoreElementComponent } from "./pages/stores/store-element/store-element.component";

import { ProductsPageComponent } from "./pages/products/products-page.component";
import { ProductElementComponent } from "./pages/products/product-element/product-element.component";

import { ForecastPageComponent } from "./pages/forecast/forecast-page.component";
import { ForecastChartComponent } from "./pages/forecast/chart/chart.component";
import { NgApexchartsModule } from "ng-apexcharts";

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  BootstrapThemePlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegistrationPageComponent,
    LoginCardComponent,
    SignupCardComponent,
    ErrorMessageComponent,
    ConfirmEmailComponent,
    AccountPageComponent,
    TopSectionComponent,
    MainSectionProfileComponent,
    GeneralInformationSectionComponent,
    EmailSectionComponent,
    PasswordSectionComponent,
    defaultImagePipe,
    LandingComponent,

    StoresPageComponent,
    StoreElementComponent,
    ProductsPageComponent,
    ProductElementComponent,
    ForecastPageComponent,
    ForecastChartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    Ng2PageScrollModule,
    InfiniteScrollModule,
    FullCalendarModule,
    NgApexchartsModule
  ],
  providers: [
    AuthentificationInterceptorProvider,
    HttpErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
