import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class LoginService{

    token: string;

    constructor(private router: Router){}


    login(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password).
            then(
                response => {
                    firebase.auth().currentUser.getIdToken().then(
                        token => {
                            console.log(token)
                            this.token = token;
                            this.router.navigate(['/testos']);
                        }
                    )
                }
            )
            
    }

    getIdToken(){
        return this.token;
    }

    isAutenticado(){
        return this.token != null; //Si el token es null vol dir que no hem entrat
    }

    logout(){
        firebase.auth().signOut().then( () => {
            this.token = null;
            this.router.navigate(['/'])
        })
    }
}