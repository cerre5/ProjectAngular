import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['main-page'])
  }
}
