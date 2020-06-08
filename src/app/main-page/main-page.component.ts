import { Component, OnInit } from '@angular/core';
import { DataServices } from '../data.services';
import * as firebase from 'firebase';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  prova: string = "SUP";

  constructor(private dataServices: DataServices,
    private loginService: LoginService,
    private router: Router,
    public user: UserService) { }

  ngOnInit() {
    //comprovar si el usuari ha fet login
    if (!this.user.getUID()) {
      this.router.navigate(['register']);
    }

  }
  logout() {
    this.router.navigate(['login']);
  }

  isAutenticado() {
    return this.loginService.isAutenticado();
  }

  salir() {
    this.loginService.logout();
  }

  obrirReactionSpeed() {
    this.router.navigate(['reaction-speed']);
  }

  obrirAltreTest() {
    this.router.navigate(['altre-test']);
  }

}
