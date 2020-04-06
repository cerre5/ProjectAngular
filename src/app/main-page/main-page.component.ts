import { Component, OnInit } from '@angular/core';
import { DataServices } from '../data.services';
import * as firebase from 'firebase';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  prova: string = "SUP";

  constructor(private dataServices: DataServices, private loginService: LoginService) { }

  ngOnInit(){
    // firebase.initializeApp({  NO CAL AQUI
    //   apiKey: "AIzaSyDtqry5sCAVie6uv06rBFyfOLdUXhFJYKU",
    //   authDomain: "projecteangularmad.firebaseapp.com",
    // })
  }

  isAutenticado(){
    return this.loginService.isAutenticado();
  }

  salir(){
    this.loginService.logout();
  }

}
