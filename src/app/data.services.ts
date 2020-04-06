import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class DataServices{
    constructor(private httpClient: HttpClient,
                private loginService: LoginService
        ){}

    cargarTest(){
        const token = this.loginService.getIdToken();
        return this.httpClient.get('https://projecteangularmad.firebaseio.com/datos.json?auth=' + token);
    }
}