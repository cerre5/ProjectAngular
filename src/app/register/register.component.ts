import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(public afAuth: AngularFireAuth,
    public user: UserService,
    public router: Router,
    public afstore: AngularFirestore) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, cpassword } = this
    if (password !== cpassword) {
      return console.error("les contrasenyes no coincideixen")
    }

    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(username, password)

      
      this.afstore.doc(`users/${res.user.uid}`).set({
        username
      })
      

      this.user.setUser({
        username,
        uid: res.user.uid
      })

      this.router.navigate(['/testos'])

    } catch (err) {
      console.dir(err)
    }
  }

}
