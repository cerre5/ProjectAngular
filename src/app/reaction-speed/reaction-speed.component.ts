import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
var jocComensat = false;
var divEsClickable = true;
var interval;
var tempsAconseguit;

@Component({
  selector: 'app-reaction-speed',
  templateUrl: './reaction-speed.component.html',
  styleUrls: ['./reaction-speed.component.css']
})


export class ReactionSpeedComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {

  }

  tornar() {
    if (!jocComensat) {
      this.router.navigate(['main-page']);
    }
  }

  onDivClick() {
    if (!jocComensat && divEsClickable) {
      jocComensat = true;
      document.getElementById("divclickable").style.backgroundColor = "yellow";
      document.getElementById("divclickable").innerHTML = "espera al color verd i clica";
      var numeroAleatori = Math.floor(Math.random() * (+5000 - +2000)) + +2000;
      this.esperarTempsAleatori(numeroAleatori);
    } else if(jocComensat && divEsClickable) {
      clearInterval(interval);
      //AQUI ESTA EL VALOR PER PUJAR A LA BASE DE DADES SI ES EL SEU MILLOR TEMPS
      console.log(tempsAconseguit);
      document.getElementById("divclickable").innerHTML = document.getElementById("divclickable").innerHTML + "<br />" + "torna a clickar  ";
      jocComensat = false;
    }
  }

  esperarTempsAleatori(numeroAleatori) {
    divEsClickable = false;
    setTimeout(this.comensarJoc, numeroAleatori);
  }
  comensarJoc() {
    divEsClickable=true;
    var startTime = Date.now();
    document.getElementById("divclickable").style.backgroundColor = "green";
    interval = setInterval(function () {
      var elapsedTime = Date.now() - startTime;
      document.getElementById("divclickable").innerHTML = (elapsedTime / 1000).toFixed(3);
      tempsAconseguit = (elapsedTime / 1000).toFixed(3);
    }, 100);
  }
}
