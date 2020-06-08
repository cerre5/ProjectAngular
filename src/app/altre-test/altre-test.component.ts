import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControlDirective } from '@angular/forms';
import { UserService } from '../user.service';
var divEsClickable = true;
var nivell = 0;
var numeroCorrecte = 0;
var jocComensat = false;
var mostrarTextArea;

@Component({
  selector: 'app-altre-test',
  templateUrl: './altre-test.component.html',
  styleUrls: ['./altre-test.component.css']
})
export class AltreTestComponent implements OnInit {


  constructor(private router: Router,
    public user: UserService) { }

  ngOnInit() {

    //comprovar si el usuari ha fet login
    if (!this.user.getUID()) {
      this.router.navigate(['register']);
    }

    mostrarTextArea = document.getElementById("comprovar");
    mostrarTextArea.style.display = "none";
  }

  onDivClick() {
    if (divEsClickable) {
      this.ensenyarNumero();

    }
    /* 
       nivell = nivell + 1;
       ensenyar numero aleatori i posarlo en una variable
       esperar uns seogons i cridar funcio que ensenyi el conjunt de textarea i que comprovo lo entrat amb la variable del AbstractControlDirective
   */
  }

  generarAleatori(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if (n > max) {
      return this.generarAleatori(max) + this.generarAleatori(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
  }

  ensenyarNumero() {
    mostrarTextArea.style.display = "none";
    jocComensat = true;
    divEsClickable = false;
    nivell = nivell + 1;
    numeroCorrecte = this.generarAleatori(nivell);
    document.getElementById("divClickable").innerHTML = "Nivell: " + nivell + "<br />" + numeroCorrecte.toString();

    setTimeout(this.inputResposta, 3000);
  }

  inputResposta() {
    (<HTMLInputElement>document.getElementById('inputNumber')).value = "";
    mostrarTextArea.style.display = "block";
    document.getElementById("divClickable").innerHTML = "Entra el numero que acabes de veure";
  }

  comprovarResposta(textareaValue) {
    if (textareaValue != "") {
      if (textareaValue == numeroCorrecte) {
        this.ensenyarNumero();
      } else {
        this.gameover();
      }
    }
  }

  gameover() {
    document.getElementById("divClickable").innerHTML = "Has completat " + (nivell - 1) + " nivells, memoritzant fins a " + (nivell - 1) + " xifres" + "<br />" + "clicka per tornar a jugar";
    mostrarTextArea.style.display = "none";
    jocComensat = false;
    divEsClickable = true;
    nivell = 0;

  }

  tornar() {
    if (!jocComensat) {
      this.router.navigate(['main-page']);
    }
  }
}
