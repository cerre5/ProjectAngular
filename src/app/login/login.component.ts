import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ""
  password: string = ""

  constructor(public afAuth: AngularFireAuth,
    public user: UserService,
    public router: Router) { }

  ngOnInit() {
  }


  redirectRegister() {
    this.router.navigate(['/register'])
  }

  async login() {
    const { username, password } = this
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(username, password)

      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.router.navigate(['/testos'])
      }



    } catch (err) {
      console.dir(err)
      if (err.code === "auth/user-not-found") {
        console.log("user not found")
      }
    }
  }

}
