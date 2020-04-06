import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MADapp';

  constructor(){}

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyDtqry5sCAVie6uv06rBFyfOLdUXhFJYKU",
      authDomain: "projecteangularmad.firebaseapp.com",
    })
  }

}
