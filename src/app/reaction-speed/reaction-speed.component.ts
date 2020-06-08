import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServices } from '../data.services';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

var jocComensat = false;
var divEsClickable = true;
var interval;
var tempsAconseguit: number;
var username;


@Component({
  selector: 'app-reaction-speed',
  templateUrl: './reaction-speed.component.html',
  styleUrls: ['./reaction-speed.component.css']
})


export class ReactionSpeedComponent implements OnInit {

  public reactionEntry;
  public esMaxim = false;
  public tempsAconseguitFirebase: number;
  public maximaPuntuacio: number;
  public ranking;

  constructor(
    private router: Router,
    private dataServices: DataServices,
    public afstore: AngularFirestore,
    public user: UserService) {
    //comprovar si el usuari ha fet login
    if (!this.user.getUID()) {
      this.router.navigate(['register']);
    }

    //DIRLI AL USUARI EL SEU MILLOR TEMPS
    this.carregarMillorPuntuacio()

    //RANKIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIING

    //CARREGAR TOTS ELS POSTS ORDENATS PER PUNTUACIO
    //NO CAL FER SUBSCRIBE AQUI SI FAIG ASYNC NGMODEL AL HTML BROHTER 
    this.carregarRanking()


  }

  ngOnInit() {
    //comprovar si el usuari ha fet login
    if (!this.user.getUID()) {
      this.router.navigate(['register']);
    }

    username = this.user.getUsername();
    console.log(username)

  }

  carregarMillorPuntuacio() {
    this.afstore.doc<any>(`reaction/${this.user.getUID()}`).valueChanges()
      .subscribe(value => {
        if (value != undefined) {

          this.maximaPuntuacio = value.tempsAconseguit

        } else {

          this.maximaPuntuacio = null

        }
      })
  }

  carregarRanking() {
    this.afstore.collection('reaction', ref =>
      ref.orderBy('tempsAconseguit')).valueChanges().subscribe(value => {
        this.ranking = value
      })
  }

  tornar() {
    if (!jocComensat) {
      this.router.navigate(['main-page']);
    }
  }

  onDivClick() {
    if (!jocComensat && divEsClickable) {
      jocComensat = true;
      document.getElementById("divclickable").style.backgroundColor = "darkorange";
      document.getElementById("textclickable").innerHTML = "Espera al color verd i clica";
      var numeroAleatori = Math.floor(Math.random() * (+5000 - +2000)) + +2000;
      this.esperarTempsAleatori(numeroAleatori);
    } else if (jocComensat && divEsClickable) {
      clearInterval(interval);
      //AQUI ESTA EL VALOR PER PUJAR A LA BASE DE DADES SI ES EL SEU MILLOR TEMPS

      if (this.afstore.doc(`reaction/${this.user.getUID()}`)) {
        this.afstore.doc<any>(`reaction/${this.user.getUID()}`).valueChanges()
          .subscribe(value => {
            if (value != undefined) {
              this.tempsAconseguitFirebase = value.tempsAconseguit;
              console.log("firebase: " + this.tempsAconseguitFirebase + " tempaaconseguit: " + tempsAconseguit)

              if (this.tempsAconseguitFirebase > tempsAconseguit) {
                this.afstore.doc(`reaction/${this.user.getUID()}`).set({
                  username,
                  tempsAconseguit
                })

              }

            } else {

              this.afstore.doc(`reaction/${this.user.getUID()}`).set({
                username,
                tempsAconseguit
              })

            }
          })

      }


      console.log(this.esMaxim)

      //this.dataServices.guardarPuntuacio("usuariPendentDeFerLogin", "reactionspeed", tempsAconseguit)
      document.getElementById("textclickable").innerHTML = document.getElementById("textclickable").innerHTML + "<br />" + "Torna a intentar-ho!";
      jocComensat = false;
    }
    this.carregarRanking();
  }

  esperarTempsAleatori(numeroAleatori) {
    divEsClickable = false;
    setTimeout(this.comensarJoc, numeroAleatori);
  }
  comensarJoc() {
    divEsClickable = true;
    var startTime = Date.now();
    document.getElementById("divclickable").style.backgroundColor = "green";
    interval = setInterval(function () {
      var elapsedTime = Date.now() - startTime;
      document.getElementById("textclickable").innerHTML = (elapsedTime / 1000).toFixed(3);
      tempsAconseguit = parseFloat((elapsedTime / 1000).toFixed(3));
    }, 100);
  }
}
