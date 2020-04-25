
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageModule } from './login-page/login-page.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ContactPageModule } from './contact-page/contact-page.module';
import { NeedAuthGuard } from './auth.guard';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [NeedAuthGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [NeedAuthGuard]
  },
  {
    path: 'contact-us',
    component: ContactPageComponent,
    canActivate: [NeedAuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    LoginPageModule,
    HomePageModule,
    ContactPageModule,
    HttpClientModule
  ],
  providers: [
    NeedAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
