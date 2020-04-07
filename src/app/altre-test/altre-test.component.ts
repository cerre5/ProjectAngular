import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-altre-test',
  templateUrl: './altre-test.component.html',
  styleUrls: ['./altre-test.component.css']
})
export class AltreTestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }
  tornar() {
    this.router.navigate(['main-page'])
  }
}
