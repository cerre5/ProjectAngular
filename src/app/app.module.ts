import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginService } from './login/login.service';
import { FormsModule } from '@angular/forms';
import { DataServices } from './data.services';
import { HttpClientModule } from '@angular/common/http';
import { ReactionSpeedComponent } from './reaction-speed/reaction-speed.component';
import { AltreTestComponent } from './altre-test/altre-test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    LoginComponent,
    ReactionSpeedComponent,
    AltreTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService, DataServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
