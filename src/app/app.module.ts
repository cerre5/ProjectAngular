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
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './user.service';
import { RegisterComponent } from './register/register.component';

const config ={
  // Your web app's Firebase configuration
    apiKey: "AIzaSyDBAb4pAdFwvUK9CTKFzMcfMhVUehLA4Vk",
    authDomain: "humanbenchmark-2f214.firebaseapp.com",
    databaseURL: "https://humanbenchmark-2f214.firebaseio.com",
    projectId: "humanbenchmark-2f214",
    storageBucket: "humanbenchmark-2f214.appspot.com",
    messagingSenderId: "76957864236",
    appId: "1:76957864236:web:46279f16e2c01e2e261c89",
    measurementId: "G-FKPTVMZ3V5"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    LoginComponent,
    ReactionSpeedComponent,
    AltreTestComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
  ],
  providers: [LoginService, DataServices, UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
