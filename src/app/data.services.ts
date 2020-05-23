import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class DataServices {


    constructor(private httpClient: HttpClient,
        private loginService: LoginService
    ) { }

    guardarPuntuacio(usuari: string, gamemode: string, puntuacio: number) {
    type tipusPuntuacions = Array<{usuari: string, gamemode: string, puntuacio: number}>;
        
        const arrayAPenjar: tipusPuntuacions = [
            {usuari: usuari, gamemode: gamemode, puntuacio: puntuacio},
        ];

        this.httpClient.post<tipusPuntuacions>('https://humanbenchmark-2f214.firebaseio.com/puntuacions.json', arrayAPenjar)
            .subscribe(
                response=> console.log("resultat la guardar puntuacio: " + response),
                error=> console.log("error al guardar puntuacio: " + error)
            )
    }
}