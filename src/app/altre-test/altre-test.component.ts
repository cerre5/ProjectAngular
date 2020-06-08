import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControlDirective } from '@angular/forms';
import { UserService } from '../user.service';
import { AngularFireStorage } from '@angular/fire/storage/storage';
import { AngularFirestore } from '@angular/fire/firestore';
var divEsClickable = true;
var nivell = 0;
var numeroCorrecte = 0;
var jocComensat = false;
var mostrarTextArea;
var username;
@Component({
  selector: 'app-altre-test',
  templateUrl: './altre-test.component.html',
  styleUrls: ['./altre-test.component.css']
})
export class AltreTestComponent implements OnInit {
  public nivellFirebase: number;
  public maximaPuntuacio: number;
  public ranking;
  public altreEntry;


  constructor(private router: Router,
    public user: UserService,
    public afstore: AngularFirestore) {
    //comprovar si el usuari ha fet login
    if (!this.user.getUID()) {
      this.router.navigate(['register']);
    }

    //DIRLI AL USUARI EL SEU MILLOR TEMPS
    this.carregarMillorPuntuacio()

    //RANKIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIING

    //CARREGAR TOTS ELS POSTS ORDENATS PER PUNTUACIO
    this.carregarRanking()
  }
  logout() {
    this.router.navigate(['login']);
  }
  carregarMillorPuntuacio() {
    this.afstore.doc<any>(`altre/${this.user.getUID()}`).valueChanges()
      .subscribe(value => {
        if (value != undefined) {

          this.maximaPuntuacio = value.nivell

        } else {

          this.maximaPuntuacio = null

        }
      })
  }

  carregarRanking() {
    this.afstore.collection('altre', ref =>
      ref.orderBy('nivell')).valueChanges().subscribe(value => {
        this.ranking = value
      })
  }

  ngOnInit() {

    //comprovar si el usuari ha fet login
    if (!this.user.getUID()) {
      this.router.navigate(['register']);
    }

    username = this.user.getUsername();
    mostrarTextArea = document.getElementById("comprovar");
    mostrarTextArea.style.display = "none";
  }

  onDivClick() {
    nivell = 0;
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
    console.log(nivell)
    document.getElementById("divClickable").innerHTML = "Has completat " + (nivell - 1) + " nivells, memoritzant fins a " + (nivell - 1) + " xifres" + "<br />" + "clicka per tornar a jugar";
    nivell = nivell - 1
    //PENJAR EL NIVELL SI ES MES ALT QUE EL SEU MAXIM

    if (this.afstore.doc(`altre/${this.user.getUID()}`)) {
      this.afstore.doc<any>(`altre/${this.user.getUID()}`).valueChanges()
        .subscribe(value => {
          if (value != undefined) {
            this.nivellFirebase = value.nivell;
            console.log("firebase: " + this.nivellFirebase + " nivell: " + nivell)

            if (this.nivellFirebase < nivell) {
              this.afstore.doc(`altre/${this.user.getUID()}`).set({
                username,
                nivell
              })

            }

          } else {

            this.afstore.doc(`altre/${this.user.getUID()}`).set({
              username,
              nivell
            })

          }
        })

    }


    mostrarTextArea.style.display = "none";
    jocComensat = false;
    divEsClickable = true;


  }

  tornar() {
    if (!jocComensat) {
      this.router.navigate(['main-page']);
    }
  }
}
